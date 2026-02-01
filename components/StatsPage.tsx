// app/estadistiques/page.tsx  (App Router)
// Server Component: consulta Prisma directamente

import CompanyLogos from "@/components/ComopanyLogos"
import PageHeading from "@/components/PageHeading"
import { db } from "@/lib/db/db"

type GenItem = { generation: number; count: number }

function pct(n: number) {
  return `${Math.round(n * 100)}%`
}

function formatK(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return `${n}`
}

function safeRate(num: number, den: number) {
  if (!den) return 0
  return num / den
}

// clave para agrupar: case-insensitive + limpieza básica
function normalizeKey(s: string) {
  return s
    .trim()
    .normalize("NFKC")
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, " ")
    .replace(/[.,;:]+$/g, "")
    .replace(/\s*\(.*?\)\s*/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
}

// nombre a mostrar: respeta siglas cortas (UPC, IBM, BBVA, etc.)
function displayName(original: string) {
  const cleaned = original
    .trim()
    .normalize("NFKC")
    .replace(/[\u00A0\u2000-\u200B\u202F\u205F\u3000]/g, " ")
    .replace(/[.,;:]+$/g, "")
    .replace(/\s+/g, " ")

  return cleaned
    .split(" ")
    .map((w) => {
      const isAllCaps = w === w.toUpperCase()
      const lettersOnly = w.replace(/[^A-ZÁÉÍÓÚÜÑ]/g, "")
      if (isAllCaps && lettersOnly.length > 0 && lettersOnly.length <= 4) return w
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    })
    .join(" ")
}

function splitKeywords(s?: string | null) {
  if (!s) return []
  return s
    .split(/[,;|]/g)
    .map((x) => x.trim())
    .filter(Boolean)
}

type CountItem = { count: number; label: string }
type TopItem = { name: string; count: number }

function toTop(map: Map<string, CountItem>, limit = 10): TopItem[] {
  return [...map.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map(({ label, count }) => ({ name: label, count }))
}

function ProgressRow({ name, count, max }: { name: string; count: number; max: number }) {
  const w = max === 0 ? 0 : Math.round((count / max) * 100)
  return (
    <div className="flex items-center gap-3">
      <div className="w-40 truncate text-sm font-medium text-slate-800 sm:w-56">{name}</div>
      <div className="flex-1">
        <div className="h-2 overflow-hidden rounded-full bg-slate-100 ring-1 ring-black/5">
          <div className="bg-upc h-full" style={{ width: `${w}%` }} />
        </div>
      </div>
      <div className="w-10 text-right text-sm font-semibold text-slate-700">{count}</div>
    </div>
  )
}

function SectionTitle({ kicker, title, subtitle }: { kicker?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-5 text-center">
      {kicker && <div className="text-upc text-xs font-bold tracking-widest uppercase">{kicker}</div>}
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-2 max-w-3xl text-slate-600">{subtitle}</p>}
    </div>
  )
}

function StatCard({ label, value, sublabel }: { label: string; value: React.ReactNode; sublabel?: string }) {
  return (
    <div className="rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-black/5">
      <div className="text-sm font-semibold text-slate-600">{label}</div>
      <div className="text-upc mt-3 text-5xl font-extrabold tracking-tight md:text-6xl">{value}</div>
      {sublabel && <div className="mt-2 text-sm text-slate-500">{sublabel}</div>}
    </div>
  )
}

export default async function StatsPage() {
  const [alumniCount, internshipsCount, cohortsGrouped, alumniRows, internshipRows, masterRows] = await Promise.all([
    db.alumni.count(),
    db.internship.count(),
    db.alumni.groupBy({ by: ["generation"], _count: { _all: true } }),
    db.alumni.findMany({
      select: {
        currentJob: true,
        currentOrganization: true,
        currentJobRelatedToGCED: true,
        currentJobKeywordsDomain: true,
        tfgCountry: true,
      },
    }),
    db.internship.findMany({
      select: { organization: { select: { name: true } } },
    }),
    db.masterAlumni.findMany({
      select: { master: { select: { name: true } } },
    }),
  ])

  const byGeneration: GenItem[] = cohortsGrouped
    .map((c) => ({ generation: c.generation, count: c._count._all }))
    .sort((a, b) => a.generation - b.generation)

  // Rates
  const withJob = alumniRows.filter((a) => Boolean(a.currentJob || a.currentOrganization)).length
  const employedRate = safeRate(withJob, alumniCount)

  const gcedRelatedYes = alumniRows.filter((a) => {
    const v = (a.currentJobRelatedToGCED || "").trim().toLowerCase()
    return v === "yes" || v === "si" || v === "sí" || v === "true" || v === "1"
  }).length
  const gcedRelatedRate = safeRate(gcedRelatedYes, alumniCount)

  // Proxy: TFG fuera de España
  const intl = alumniRows.filter((a) => (a.tfgCountry || "Spain") !== "Spain").length

  // Maps (dedupe Mango/MANGO, etc. + display label estable)
  const internMap = new Map<string, CountItem>()
  for (const row of internshipRows) {
    const raw = row.organization.name
    const key = normalizeKey(raw)
    const prev = internMap.get(key)
    if (prev) prev.count += 1
    else internMap.set(key, { count: 1, label: displayName(raw) })
  }

  const jobMap = new Map<string, CountItem>()
  for (const a of alumniRows) {
    if (!a.currentOrganization) continue
    const raw = a.currentOrganization
    const key = normalizeKey(raw)
    const label = displayName(raw)
    const prev = jobMap.get(key)
    if (prev) prev.count += 1
    else jobMap.set(key, { count: 1, label })
  }

  const masterMap = new Map<string, CountItem>()
  for (const m of masterRows) {
    const raw = m.master.name
    const key = normalizeKey(raw)
    const prev = masterMap.get(key)
    if (prev) prev.count += 1
    else masterMap.set(key, { count: 1, label: displayName(raw) })
  }

  const domainMap = new Map<string, CountItem>()
  for (const a of alumniRows) {
    for (const kw of splitKeywords(a.currentJobKeywordsDomain)) {
      const raw = kw
      const key = normalizeKey(raw)
      const prev = domainMap.get(key)
      if (prev) prev.count += 1
      else domainMap.set(key, { count: 1, label: displayName(raw) })
    }
  }

  const topInternships = toTop(internMap, 10)
  const topJobs = toTop(jobMap, 10)
  const topMasters = toTop(masterMap, 8)
  const topDomains = toTop(domainMap, 10)

  const maxIntern = Math.max(0, ...topInternships.map((x) => x.count))
  const maxJobs = Math.max(0, ...topJobs.map((x) => x.count))
  const maxMasters = Math.max(0, ...topMasters.map((x) => x.count))
  const maxDomains = Math.max(0, ...topDomains.map((x) => x.count))

  return (
    <main className="flex w-full flex-col items-stretch">
      <PageHeading title="Estadístiques" subtitle="Basat en alumni registrats a la base de dades." />

      {/* KPI banner-like: fondo gris + contenedor centrado */}
      <section className="bg-upc flex items-center justify-center border-t">
        <div className="w-full max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard label="Ocupabilitat" value={pct(employedRate)} />
            <StatCard label="Feina relacionada amb dades / IA" value={pct(gcedRelatedRate)} />
            <StatCard label="Mobilitat internacional" value={intl} sublabel="TFG fora d’Espanya" />
            <StatCard label="Alumni registrats" value={formatK(alumniCount)} />
            <StatCard label="Pràctiques registrades" value={formatK(internshipsCount)} />
            <StatCard label="Generacions registrades" value={byGeneration.length} />
          </div>
        </div>
      </section>

      <section className="border-t bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <CompanyLogos />
        </div>
      </section>

      {/* Bloque de “gráficos”/rankings con fondo blanco como home */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-10 py-12">
          <SectionTitle
            kicker="RESULTATS"
            title="Pràctiques, feina i especialització"
            subtitle="Quatre vistes ràpides: pràctiques, feina, màsters i dominis."
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-extrabold text-slate-900">Top pràctiques</h3>
                <span className="text-xs font-semibold text-slate-500">{topInternships.length} entitats</span>
              </div>
              <div className="mt-5 space-y-3">
                {topInternships.length ? (
                  topInternships.map((it) => (
                    <ProgressRow key={it.name} name={it.name} count={it.count} max={maxIntern} />
                  ))
                ) : (
                  <p className="text-sm text-slate-600">Encara no hi ha prou dades de pràctiques.</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-extrabold text-slate-900">Top feina actual</h3>
                <span className="text-xs font-semibold text-slate-500">{topJobs.length} entitats</span>
              </div>
              <div className="mt-5 space-y-3">
                {topJobs.length ? (
                  topJobs.map((it) => <ProgressRow key={it.name} name={it.name} count={it.count} max={maxJobs} />)
                ) : (
                  <p className="text-sm text-slate-600">Encara no hi ha prou dades de feina actual.</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-extrabold text-slate-900">Màsters més freqüents</h3>
                <span className="text-xs font-semibold text-slate-500">{topMasters.length} màsters</span>
              </div>
              <div className="mt-5 space-y-3">
                {topMasters.length ? (
                  topMasters.map((it) => <ProgressRow key={it.name} name={it.name} count={it.count} max={maxMasters} />)
                ) : (
                  <p className="text-sm text-slate-600">Encara no hi ha prou dades de màsters.</p>
                )}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-extrabold text-slate-900">Dominis més comuns</h3>
                <span className="text-xs font-semibold text-slate-500">{topDomains.length} dominis</span>
              </div>
              <div className="mt-5 space-y-3">
                {topDomains.length ? (
                  topDomains.map((it) => <ProgressRow key={it.name} name={it.name} count={it.count} max={maxDomains} />)
                ) : (
                  <p className="text-sm text-slate-600">
                    Encara no hi ha prou keywords a{" "}
                    <code className="rounded bg-slate-100 px-1 py-0.5">currentJobKeywordsDomain</code>.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA estilo “banner” pero alineado con el resto (contenedor centrado) */}
      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-14">
          <div className="bg-upc mx-auto max-w-5xl rounded-3xl px-6 py-10 text-white shadow-sm ring-1 ring-black/10 sm:px-10">
            <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Vols veure exemples de projectes?</h2>

            <p className="mx-auto mt-2 max-w-3xl text-center text-white/90">
              Descobreix projectes desenvolupats a la universitat i coneix els alumni, els seus interessos i projectes
              personals.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                className="text-upc inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-bold shadow-sm"
                href="/projectes"
              >
                Projectes de la universitat
              </a>
              <a
                className="inline-flex items-center justify-center rounded-xl bg-transparent px-5 py-3 font-bold text-white ring-2 ring-white/60 hover:ring-white"
                href="/estudiants"
              >
                Alumni i projectes personals
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="h-20" />
    </main>
  )
}
