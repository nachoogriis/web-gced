// app/estadistiques/page.tsx
// Server Component (Prisma) — redisseny coherent, modern i orientat a divulgació (informatiu, no “venta”)

import CompanyLogos from "@/components/ComopanyLogos"
import PageHeading from "@/components/PageHeading"
import { db } from "@/lib/db/db"
import { Briefcase, Building2, GraduationCap, Banknote, MessageSquareText, MapPin, BarChart3 } from "lucide-react"
import MobilityMap from "@/components/MobilityMap"

type CountItem = { count: number; label: string }
type TopItem = { name: string; count: number }

function pct(n: number) {
  return `${Math.round(n * 100)}%`
}
function safeRate(num: number, den: number) {
  if (!den) return 0
  return num / den
}
function formatK(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return `${n}`
}
function formatEUR(n: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n)
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

function toTop(map: Map<string, CountItem>, limit = 10): TopItem[] {
  return [...map.values()]
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
    .map(({ label, count }) => ({ name: label, count }))
}

function median(values: number[]) {
  if (!values.length) return null
  const a = [...values].sort((x, y) => x - y)
  const mid = Math.floor(a.length / 2)
  if (a.length % 2 === 1) return a[mid]
  return (a[mid - 1] + a[mid]) / 2
}

// Parse “currentJobSalary” (string) a salari anual estimat (EUR)
function parseSalaryAnnualEUR(s?: string | null) {
  if (!s) return null
  const cleaned = s
    .trim()
    .replace(/\u00A0/g, " ")
    .replace(/\./g, "") // 30.000 -> 30000
    .replace(/,/g, ".") // 30,5 -> 30.5

  const m = cleaned.match(/(\d{2,6}(\.\d+)?)/)
  if (!m) return null
  const n = Number(m[1])
  if (!Number.isFinite(n) || n <= 0) return null

  const isMonthly =
    /\/\s*mes|mensual|month|mo\b/i.test(cleaned) || (n > 300 && n < 12000 && !/anual|year|año|\/\s*a/i.test(cleaned))

  return isMonthly ? n * 12 : n
}

function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={[
        "rounded-3xl bg-white/80 shadow-sm ring-1 ring-black/5 backdrop-blur",
        "transition-shadow hover:shadow-md",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  )
}

function MetaPill({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-black/5">
      <span className="text-slate-500">{label}</span>
      <span className="text-slate-800 tabular-nums">{value}</span>
    </div>
  )
}

function KpiCard({
  icon,
  label,
  value,
  sublabel,
  emphasize,
}: {
  icon: React.ReactNode
  label: string
  value: React.ReactNode
  sublabel?: string
  emphasize?: boolean
}) {
  return (
    <div
      className={[
        "rounded-3xl p-6 ring-1 ring-black/5",
        emphasize ? "bg-upc text-white ring-black/10" : "bg-white/80 text-slate-900",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div
            className={[
              "text-xs font-bold tracking-widest uppercase",
              emphasize ? "text-white/80" : "text-slate-600",
            ].join(" ")}
          >
            {label}
          </div>
          <div
            className={[
              "mt-2 text-3xl font-extrabold tracking-tight",
              emphasize ? "text-white" : "text-slate-900",
            ].join(" ")}
          >
            {value}
          </div>
          {sublabel && (
            <div className={["mt-1 text-sm", emphasize ? "text-white/70" : "text-slate-500"].join(" ")}>{sublabel}</div>
          )}
        </div>
        <div className={["rounded-2xl p-3 ring-1 ring-black/5", emphasize ? "bg-white/10" : "bg-slate-50"].join(" ")}>
          {icon}
        </div>
      </div>
    </div>
  )
}

function BarsList({
  title,
  subtitle,
  items,
  max,
  empty,
}: {
  title: string
  subtitle?: string
  items: TopItem[]
  max: number
  empty: React.ReactNode
}) {
  return (
    <CardShell className="p-6">
      <div className="flex items-baseline justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-extrabold text-slate-900">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
        </div>
        <div className="shrink-0 text-xs font-semibold text-slate-500">{items.length} items</div>
      </div>

      <div className="mt-6 space-y-3">
        {items.length ? (
          items.map((it) => {
            const w = max === 0 ? 0 : Math.round((it.count / max) * 100)
            return (
              <div key={it.name} className="flex items-center gap-3">
                <div className="w-44 truncate text-sm font-semibold text-slate-800 sm:w-56">{it.name}</div>
                <div className="flex-1">
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 ring-1 ring-black/5">
                    <div className="bg-upc h-full" style={{ width: `${w}%` }} />
                  </div>
                </div>
                <div className="w-10 text-right text-sm font-bold text-slate-700 tabular-nums">{it.count}</div>
              </div>
            )
          })
        ) : (
          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-black/5">{empty}</div>
        )}
      </div>
    </CardShell>
  )
}

type SalaryBucket = { label: string; min: number; max?: number } // max undefined => infinito

const SALARY_BUCKETS: SalaryBucket[] = [
  { label: "0€ a 20.000€", min: 0, max: 20000 },
  { label: "20.000€ a 40.000€", min: 20000, max: 40000 },
  { label: "40.000€ a 60.000€", min: 40000, max: 60000 },
  { label: "60.000€ a 80.000€", min: 60000, max: 80000 },
  { label: "80.000€ o més", min: 80000 },
]

function SalaryDistribution({ values }: { values: number[] }) {
  const counts = SALARY_BUCKETS.map((b) => {
    const c = values.filter((v) => (b.max ? v >= b.min && v < b.max : v >= b.min)).length
    return { bucket: b.label, count: c }
  })
  const max = Math.max(0, ...counts.map((x) => x.count))

  return (
    <div className="mt-5 space-y-3">
      {counts.map((x) => {
        const w = max === 0 ? 0 : Math.round((x.count / max) * 100)
        return (
          <div key={x.bucket} className="flex items-center gap-3">
            <div className="w-20 text-sm font-semibold text-slate-800">{x.bucket}</div>
            <div className="flex-1">
              <div className="h-2 overflow-hidden rounded-full bg-slate-100 ring-1 ring-black/5">
                <div className="bg-upc h-full" style={{ width: `${w}%` }} />
              </div>
            </div>
            <div className="w-10 text-right text-sm font-bold text-slate-700 tabular-nums">{x.count}</div>
          </div>
        )
      })}
    </div>
  )
}

// Mapa simple (equirectangular) con “pins” por país para divulgación.
// No depende de librerías externas.
const COUNTRY_COORDS: Record<string, { lat: number; lon: number }> = {
  spain: { lat: 40.4, lon: -3.7 },
  espana: { lat: 40.4, lon: -3.7 },
  españa: { lat: 40.4, lon: -3.7 },

  france: { lat: 48.9, lon: 2.3 },
  germany: { lat: 52.5, lon: 13.4 },
  netherlands: { lat: 52.37, lon: 4.9 },
  belgium: { lat: 50.85, lon: 4.35 },
  italy: { lat: 41.9, lon: 12.5 },
  portugal: { lat: 38.72, lon: -9.14 },
  switzerland: { lat: 46.95, lon: 7.45 },
  austria: { lat: 48.2, lon: 16.37 },
  ireland: { lat: 53.35, lon: -6.26 },
  uk: { lat: 51.5, lon: -0.12 },
  "united kingdom": { lat: 51.5, lon: -0.12 },

  usa: { lat: 38.9, lon: -77.0 },
  "united states": { lat: 38.9, lon: -77.0 },
  canada: { lat: 45.4, lon: -75.7 },

  mexico: { lat: 19.43, lon: -99.13 },
  brazil: { lat: -23.55, lon: -46.63 },

  china: { lat: 39.9, lon: 116.4 },
  japan: { lat: 35.7, lon: 139.7 },
  korea: { lat: 37.56, lon: 126.97 },
  "south korea": { lat: 37.56, lon: 126.97 },

  sweden: { lat: 59.33, lon: 18.07 },
  norway: { lat: 59.91, lon: 10.75 },
  denmark: { lat: 55.68, lon: 12.57 },
  finland: { lat: 60.17, lon: 24.94 },
  poland: { lat: 52.23, lon: 21.01 },
}

function lonLatToXY(lon: number, lat: number, w: number, h: number) {
  // equirectangular projection onto a rectangle:
  // x: [-180..180] -> [0..w]
  // y: [90..-90]  -> [0..h]
  const x = ((lon + 180) / 360) * w
  const y = ((90 - lat) / 180) * h
  return { x, y }
}

export default async function StatsPage() {
  const [alumniCount, internshipsCount, alumniRows, internshipRows, masterRows] = await Promise.all([
    db.alumni.count(),
    db.internship.count(),
    db.alumni.findMany({
      select: {
        generation: true,
        currentJob: true,
        currentOrganization: true,
        currentJobKeywordsDomain: true,
        currentJobKeywordsSpecialty: true,
        currentJobSalary: true,
        currentJobRelatedToGCED: true,
        hasMobility: true,
        mobilityCountry: true,
        review: true,
      },
    }),
    db.internship.findMany({ select: { organization: { select: { name: true } } } }),
    db.masterAlumni.findMany({ select: { master: { select: { name: true } } } }),
  ])

  // KPI: ocupabilitat (proxy: te currentJob o currentOrganization)
  const withJob = alumniRows.filter((a) => Boolean(a.currentJob || a.currentOrganization)).length
  const employedRate = safeRate(withJob, alumniCount)

  // Feina relacionada (si/yes/true/1)
  const gcedRelatedYes = alumniRows.filter((a) => {
    const v = (a.currentJobRelatedToGCED || "").trim().toLowerCase()
    return v === "yes" || v === "si" || v === "sí" || v === "true" || v === "1"
  }).length
  const gcedRelatedRate = safeRate(gcedRelatedYes, alumniCount)

  // Mobilitat (bool + fallback per país)
  const mobilityYes = alumniRows.filter((a) => {
    if (a.hasMobility === true) return true
    const c = (a.mobilityCountry || "").trim()
    if (c && c.toLowerCase() !== "spain" && c.toLowerCase() !== "españa" && c.toLowerCase() !== "espanya") return true
    return false
  }).length
  const mobilityRate = safeRate(mobilityYes, alumniCount)

  // KPI: % amb pràctiques (distinct alumniId)
  const alumniWithInternship = await db.internshipAlumni
    .findMany({ select: { alumniId: true }, distinct: ["alumniId"] })
    .then((rows) => rows.length)
  const internshipsRate = safeRate(alumniWithInternship, alumniCount)

  // KPI: % amb màster (distinct alumniId)
  const alumniWithMaster = await db.masterAlumni
    .findMany({ select: { alumniId: true }, distinct: ["alumniId"] })
    .then((rows) => rows.length)
  const masterRate = safeRate(alumniWithMaster, alumniCount)

  // KPI: “recomanarien” (no hi ha camp explícit → proxy: alumni amb review escrita)
  const reviewCount = alumniRows.filter((a) => Boolean((a.review || "").trim())).length
  const recommendProxyRate = safeRate(reviewCount, alumniCount)

  // Salaris
  const salaryValues = alumniRows
    .map((a) => parseSalaryAnnualEUR(a.currentJobSalary))
    .filter((x): x is number => typeof x === "number" && x > 0)

  const salaryMedian = median(salaryValues)
  const salarySample = salaryValues.length

  // Mobilitat (per al mapa): país → count (només si hi ha mobilityCountry o hasMobility)
  const mobilityCountryMap = new Map<string, CountItem>()
  for (const a of alumniRows) {
    const raw = (a.mobilityCountry || "").trim()
    if (!raw && a.hasMobility !== true) continue
    if (!raw) continue
    const key = normalizeKey(raw)
    const prev = mobilityCountryMap.get(key)
    if (prev) prev.count += 1
    else mobilityCountryMap.set(key, { count: 1, label: displayName(raw) })
  }
  const topMobilityCountries = toTop(mobilityCountryMap, 10)
  const maxMobility = Math.max(0, ...topMobilityCountries.map((x) => x.count))

  // Rankings
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
    const prev = jobMap.get(key)
    if (prev) prev.count += 1
    else jobMap.set(key, { count: 1, label: displayName(raw) })
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
      const key = normalizeKey(kw)
      const prev = domainMap.get(key)
      if (prev) prev.count += 1
      else domainMap.set(key, { count: 1, label: displayName(kw) })
    }
  }

  const specialtyMap = new Map<string, CountItem>()
  for (const a of alumniRows) {
    for (const kw of splitKeywords(a.currentJobKeywordsSpecialty)) {
      const key = normalizeKey(kw)
      const prev = specialtyMap.get(key)
      if (prev) prev.count += 1
      else specialtyMap.set(key, { count: 1, label: displayName(kw) })
    }
  }

  const topInternships = toTop(internMap, 10)
  const topJobs = toTop(jobMap, 10)
  const topMasters = toTop(masterMap, 8)
  const topDomains = toTop(domainMap, 10)
  const topSpecialties = toTop(specialtyMap, 10)

  const maxIntern = Math.max(0, ...topInternships.map((x) => x.count))
  const maxJobs = Math.max(0, ...topJobs.map((x) => x.count))
  const maxMasters = Math.max(0, ...topMasters.map((x) => x.count))
  const maxDomains = Math.max(0, ...topDomains.map((x) => x.count))
  const maxSpecialties = Math.max(0, ...topSpecialties.map((x) => x.count))

  const generationCount = new Set(alumniRows.map((a) => a.generation).filter(Boolean)).size

  return (
    <main className="flex w-full flex-col items-stretch bg-white">
      <PageHeading title="Estadístiques" subtitle="Dades agregades dels garduats." />
      <div className="flex flex-wrap justify-center gap-2">
        <MetaPill label="Alumni" value={`${alumniCount}`} />
        <MetaPill label="Generacions" value={`${generationCount}`} />
      </div>

      <section className="bg-upc mt-10 border-b">
        <div className="mx-auto w-full max-w-6xl px-3 py-10 sm:px-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* IZQUIERDA (6 columnas) */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">Ocupabilitat</div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">{pct(employedRate)}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                    <Briefcase className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">Sou (mediana)</div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">
                      {salaryMedian ? formatEUR(salaryMedian) : "—"}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                    <Banknote className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">Feina relacionada</div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">
                      {pct(gcedRelatedRate)}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                    <BarChart3 className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>
            </div>

            {/* DERECHA (6 columnas) */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">% amb pràctiques</div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">
                      {pct(internshipsRate)}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                    <Building2 className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">% amb màster</div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">{pct(masterRate)}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                    <GraduationCap className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">Mobilitat</div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">{pct(mobilityRate)}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                    <MapPin className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-3 sm:px-4">
        {/* LOGOS (igual que Home) */}
        <section className="py-10 text-center text-sm font-semibold md:text-base lg:text-lg">
          <CompanyLogos />
        </section>

        {/* MOVILIDAD */}
        <section className="mt-6">
          <div id="mobilitat" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">Mobilitat internacional</h2>
              </div>

              <MapPin className="h-5 w-5 text-slate-400" />
            </div>

            {/* MAPA SIN RECUADROS EXTRA */}
            <div className="h-[480px] overflow-hidden rounded-2xl">
              <MobilityMap
                points={topMobilityCountries.map((p) => ({
                  label: p.name,
                  count: p.count,
                }))}
              />
            </div>
          </div>
        </section>
      </div>
      {/* RANKINGS */}
      <section id="rankings" className="-mx-3 mt-10 border-t bg-gray-100 px-3 py-10 sm:-mx-4 sm:px-4">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Rankings i perfils</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <BarsList
                title="On fan pràctiques"
                subtitle="Entitats més freqüents."
                items={topInternships}
                max={maxIntern}
                empty={<>Encara no hi ha prou dades de pràctiques.</>}
              />
            </div>

            <div className="lg:col-span-6">
              <BarsList
                title="On treballen"
                subtitle="Organitzacions més repetides."
                items={topJobs}
                max={maxJobs}
                empty={<>Encara no hi ha prou dades de feina actual.</>}
              />
            </div>

            <div className="lg:col-span-6">
              <BarsList
                title="Màsters més habituals"
                subtitle="Programes amb més repetits."
                items={topMasters}
                max={maxMasters}
                empty={<>Encara no hi ha prou dades de màsters.</>}
              />
            </div>

            <div className="lg:col-span-6">
              <BarsList
                title="Àrees i dominis"
                subtitle=""
                items={topDomains}
                max={maxDomains}
                empty={
                  <>
                    Encara no hi ha prou keywords a{" "}
                    <code className="rounded bg-white px-1 py-0.5 ring-1 ring-black/5">currentJobKeywordsDomain</code>.
                  </>
                }
              />
            </div>

            <div className="lg:col-span-6">
              <BarsList
                title="Especialització"
                subtitle=""
                items={topSpecialties}
                max={maxSpecialties}
                empty={
                  <>
                    Encara no hi ha prou keywords a{" "}
                    <code className="rounded bg-white px-1 py-0.5 ring-1 ring-black/5">
                      currentJobKeywordsSpecialty
                    </code>
                    .
                  </>
                }
              />
            </div>

            {/* SALARIS */}
            <div id="salaris" className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 lg:col-span-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900">Salaris</h2>
                </div>
                <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                  <Banknote className="h-5 w-5 text-slate-700" />
                </div>
              </div>

              {salaryValues.length ? (
                <div className="mt-4">
                  <SalaryDistribution values={salaryValues} />
                </div>
              ) : (
                <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 ring-1 ring-black/5">
                  Encara no hi ha prou dades de salari per mostrar una distribució.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA estilo “banner” pero alineado con el resto (contenedor centrado) */}
      <section className="bg-white">
        <div className="mx-auto mt-10 w-full max-w-6xl px-4 pb-14">
          <div className="bg-upc mx-auto max-w-5xl rounded-3xl px-6 py-10 text-white shadow-sm ring-1 ring-black/10 sm:px-10">
            <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Vols veure exemples de projectes?</h2>
            <p className="mx-auto mt-2 max-w-3xl text-center text-white/90">
              {" "}
              Descobreix projectes desenvolupats a la universitat i coneix als alumni, els seus interessos i projectes
              personals.{" "}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                className="text-upc inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-bold shadow-sm"
                href="/projectes"
              >
                {" "}
                Projectes de la universitat{" "}
              </a>
              <a
                className="inline-flex items-center justify-center rounded-xl bg-transparent px-5 py-3 font-bold text-white ring-2 ring-white/60 hover:ring-white"
                href="/estudiants"
              >
                {" "}
                Alumni i projectes personals{" "}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="h-16" />
    </main>
  )
}
