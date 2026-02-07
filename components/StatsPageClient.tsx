"use client"

import PageHeading from "@/components/PageHeading"
import CompanyLogo from "@/components/Logo"
import { Briefcase, Building2, GraduationCap, Banknote, MapPin, BarChart3, Star } from "lucide-react"
import dynamic from "next/dynamic"

const MobilityMap = dynamic(() => import("@/components/MobilityMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center text-slate-500">
      Carregant mapa...
    </div>
  ),
})

type TopItem = { name: string; count: number }

function pct(n: number) {
  return `${Math.round(n * 100)}%`
}

function formatEUR(n: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n)
}

function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={[
        "rounded-3xl bg-white/80 backdrop-blur shadow-sm ring-1 ring-black/5",
        "hover:shadow-md transition-shadow",
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
      <span className="tabular-nums text-slate-800">{value}</span>
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

type SalaryBucket = { label: string; min: number; max?: number }

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

type StatsPageClientProps = {
  alumniCount: number
  generationCount: number
  employedRate: number
  salaryMedian: number | null
  averageDegreeScore: number | null
  gcedRelatedRate: number
  internshipsRate: number
  masterRate: number
  mobilityRate: number
  topMobilityCountries: TopItem[]
  topInternships: TopItem[]
  topJobs: TopItem[]
  topMasters: TopItem[]
  topDomains: TopItem[]
  topSpecialties: TopItem[]
  maxIntern: number
  maxJobs: number
  maxMasters: number
  maxDomains: number
  maxSpecialties: number
  salaryValues: number[]
  jobLogos: string[]
  internshipLogos: string[]
}

export default function StatsPageClient({
  alumniCount,
  generationCount,
  employedRate,
  salaryMedian,
  averageDegreeScore,
  gcedRelatedRate,
  internshipsRate,
  masterRate,
  mobilityRate,
  topMobilityCountries,
  topInternships,
  topJobs,
  topMasters,
  topDomains,
  topSpecialties,
  maxIntern,
  maxJobs,
  maxMasters,
  maxDomains,
  maxSpecialties,
  salaryValues,
  jobLogos,
  internshipLogos,
}: StatsPageClientProps) {
  function LogosRow({ logos, animationClass, keyPrefix }: { logos: string[]; animationClass: string; keyPrefix: string }) {
    if (!logos.length) return null

    return (
      <div className="relative overflow-x-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-white to-transparent md:w-24 lg:w-32" />
        <div className={`flex gap-4 md:gap-8 lg:gap-16 ${animationClass}`} style={{ width: "max-content" }}>
          {logos.map((src, i) => (
            <CompanyLogo key={`${keyPrefix}-${i}`} image={src} />
          ))}
          {logos.map((src, i) => (
            <CompanyLogo key={`${keyPrefix}-dup-${i}`} image={src} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-white to-transparent md:w-24 lg:w-32" />
      </div>
    )
  }

  function StarRating({ score }: { score: number | null }) {
    if (score === null) return null

    // Convert from 1-10 scale to 0-5 scale
    const normalizedScore = (score / 10) * 5
    const fullStars = Math.floor(normalizedScore)
    const partialStar = normalizedScore - fullStars
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0)

    return (
      <div className="flex items-center justify-center gap-2">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="h-15 w-15 fill-yellow-400 text-yellow-400" strokeWidth={1} />
        ))}
        
        {/* Partial star */}
        {partialStar > 0 && (
          <div key="partial" className="relative h-15 w-15">
            <Star className="absolute h-15 w-15 text-slate-200" strokeWidth={1} />
            <div style={{ width: `${partialStar * 100}%` }} className="absolute overflow-hidden">
              <Star className="h-15 w-15 fill-yellow-400 text-yellow-400" strokeWidth={1} />
            </div>
          </div>
        )}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="h-15 w-15 text-slate-200" strokeWidth={1} />
        ))}
      </div>
    )
  }

  return (
    <main className="flex w-full flex-col items-stretch bg-white">
      <PageHeading title="Estadístiques" subtitle="Dades agregades dels garduats." />
      <div className="flex flex-wrap gap-2 justify-center">
        <MetaPill label="Alumni" value={`${alumniCount}`} />
        <MetaPill label="Generacions" value={`${generationCount}`} />
      </div>

      <section className="border-b bg-upc mt-10">
        <div className="mx-auto w-full max-w-6xl px-3 py-10 sm:px-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            
            <div className="grid grid-cols-1 gap-4 lg:col-span-6">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-slate-500">
                      Ocupabilitat
                    </div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">
                      {pct(employedRate)}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                    <Briefcase className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-slate-500">
                      Sou (mediana)
                    </div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">
                      {salaryMedian ? formatEUR(salaryMedian) : "—"}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                    <Banknote className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-slate-500">
                      Feina relacionada
                    </div>
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

            <div className="grid grid-cols-1 gap-4 lg:col-span-6">
              <div className="rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-slate-500">
                      % amb pràctiques
                    </div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">
                      {pct(internshipsRate)}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                    <Building2 className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-slate-500">
                      % amb màster
                    </div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">
                      {pct(masterRate)}
                    </div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 ring-1 ring-black/5">
                    <GraduationCap className="h-5 w-5 text-slate-700" />
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase text-slate-500">
                      Mobilitat
                    </div>
                    <div className="mt-2 text-4xl font-extrabold text-slate-900 tabular-nums">
                      {pct(mobilityRate)}
                    </div>
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
        {/* Average Degree Score */}
        {averageDegreeScore !== null && (
          <section className="pt-10 text-center text-sm font-semibold md:text-base lg:text-lg">
            <h2 className="mx-auto mt-4 mb-8 max-w-3xl text-slate-600">La valoració del grau segons els nostres graduats</h2>
            <StarRating score={averageDegreeScore} />
            <div className="mt-2 text-sm text-slate-600 tabular-nums  md:text-base lg:text-lg">
              {(averageDegreeScore / 2).toFixed(1)} / 5.0
            </div>
          </section>
        )}

        <section className="py-10 text-center text-sm font-semibold md:text-base lg:text-lg">
          <div className="w-full text-center">
            <h2 className="mx-auto mt-4 mb-8 max-w-3xl text-slate-600">Els nostres graduats treballen a</h2>
            <LogosRow logos={jobLogos} animationClass="animate-scroll" keyPrefix="job" />

            <h2 className="mx-auto mt-12 max-w-3xl text-slate-600">Els nostres graduats han fet pràctiques a</h2>
            <LogosRow logos={internshipLogos} animationClass="animate-scroll1 py-4" keyPrefix="intern" />
          </div>
        </section>

        <section className="mt-6">
          <div id="mobilitat" className="rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900">
                  Mobilitat internacional
                </h2>
              </div>
              <MapPin className="h-5 w-5 text-slate-400" />
            </div>

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

      <section id="rankings" className="mt-10 border-t bg-gray-100 -mx-3 px-3 sm:-mx-4 sm:px-4 py-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Rankings i perfils</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <BarsList title="On fan pràctiques" subtitle="Entitats més freqüents." items={topInternships} max={maxIntern} empty={<>Encara no hi ha prou dades de pràctiques.</>} />
            </div>

            <div className="lg:col-span-6">
              <BarsList title="On treballen" subtitle="Organitzacions més repetides." items={topJobs} max={maxJobs} empty={<>Encara no hi ha prou dades de feina actual.</>} />
            </div>

            <div className="lg:col-span-6">
              <BarsList title="Màsters més habituals" subtitle="Programes amb més repetits." items={topMasters} max={maxMasters} empty={<>Encara no hi ha prou dades de màsters.</>} />
            </div>

            <div className="lg:col-span-6">
              <BarsList title="Àrees i dominis" subtitle="" items={topDomains} max={maxDomains} empty={<>Encara no hi ha prou keywords a <code className="rounded bg-white px-1 py-0.5 ring-1 ring-black/5">currentJobKeywordsDomain</code>.</>} />
            </div>

            <div className="lg:col-span-6">
              <BarsList title="Especialització" subtitle="" items={topSpecialties} max={maxSpecialties} empty={<>Encara no hi ha prou keywords a <code className="rounded bg-white px-1 py-0.5 ring-1 ring-black/5">currentJobKeywordsSpecialty</code>.</>} />
            </div>

            <div id="salaris" className="lg:col-span-6 rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm">
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

      <section className="bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 pb-14 mt-10">
          <div className="bg-upc mx-auto max-w-5xl rounded-3xl px-6 py-10 text-white shadow-sm ring-1 ring-black/10 sm:px-10">
            <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Vols veure exemples de projectes?</h2>
            <p className="mx-auto mt-2 max-w-3xl text-center text-white/90">
              Descobreix projectes desenvolupats a la universitat i coneix als alumni, els seus interessos i projectes personals.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a className="text-upc inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-bold shadow-sm" href="/projectes">
                Projectes de la universitat
              </a>
              <a className="inline-flex items-center justify-center rounded-xl bg-transparent px-5 py-3 font-bold text-white ring-2 ring-white/60 hover:ring-white" href="/estudiants">
                Alumni i projectes personals
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="h-16" />
    </main>
  )
}
