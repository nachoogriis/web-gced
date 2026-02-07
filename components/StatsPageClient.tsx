"use client"

import PageHeading from "@/components/PageHeading"
import CompanyLogo from "@/components/Logo"
import { MapPin, Star, ArrowUp, ArrowDown } from "lucide-react"
import { ChartConfig, ChartContainer } from "./ui/chart"
import { Bar, BarChart, XAxis, YAxis, LabelList } from "recharts"
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
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n)
}

function MetaPill({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-black/5">
      <span className="text-slate-500">{label}</span>
      <span className="tabular-nums text-slate-800">{value}</span>
    </div>
  )
}

type StatsPageClientProps = {
  alumniCount: number
  generationCount: number
  employedRate: number
  salaryMedian: number | null
  averageDegreeScore: number | null
  internshipsRate: number
  masterRate: number
  topMobilityCountries: TopItem[]
  topDomains: TopItem[]
  topSpecialties: TopItem[]
  jobLogos: string[]
  internshipLogos: string[]
}

export default function StatsPageClient({
  alumniCount,
  generationCount,
  employedRate,
  salaryMedian,
  averageDegreeScore,
  internshipsRate,
  masterRate,
  topMobilityCountries,
  topDomains,
  topSpecialties,
  jobLogos,
  internshipLogos,
}: StatsPageClientProps) {
  function LogosRow({
    logos,
    animationClass,
    keyPrefix,
  }: {
    logos: string[]
    animationClass: string
    keyPrefix: string
  }) {
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

    // Convert 1–10 -> 0–5
    const normalizedScore = (score / 10) * 5
    const fullStars = Math.floor(normalizedScore)
    const partialStar = normalizedScore - fullStars
    const emptyStars = 5 - fullStars - (partialStar > 0 ? 1 : 0)

    return (
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} className="h-15 w-15 fill-yellow-400 text-yellow-400" strokeWidth={1} />
        ))}

        {partialStar > 0 && (
          <div key="partial" className="relative h-15 w-15">
            <Star className="absolute h-15 w-15 text-slate-200" strokeWidth={1} />
            <div style={{ width: `${partialStar * 100}%` }} className="absolute overflow-hidden">
              <Star className="h-15 w-15 fill-yellow-400 text-yellow-400" strokeWidth={1} />
            </div>
          </div>
        )}

        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="h-15 w-15 text-slate-200" strokeWidth={1} />
        ))}
      </div>
    )
  }

  function StatComponent({ value, label, arrow }: { value: string; label: string; arrow?: "up" | "down" }) {
    const lastChar = value.slice(-1)
    const restOfValue = value.slice(0, -1)

    return (
      <div className="text-left max-w-70 p-4">
        <div className="flex items-start gap-2">
          {arrow && (
            <div className="mt-1">
              {arrow === "up" ? (
                <ArrowUp className="h-5 w-5 text-green-500" strokeWidth={2.5} />
              ) : (
                <ArrowDown className="h-5 w-5 text-red-400" strokeWidth={2.5} />
              )}
            </div>
          )}
          <div className="text-4xl font-extrabold text-slate-600 tabular-nums">
            {restOfValue}
            <span className="text-upc text-2xl">{lastChar === "%" ? " " + lastChar : lastChar}</span>
          </div>
        </div>
        <div className="mt-1 text-sm text-slate-600">{label}</div>
      </div>
    )
  }

  function CustomBarChart({
    label,
    data,
    title,
  }: {
    label: string
    data: TopItem[]
    title?: string
  }) {
    const chartConfig = {
      count: { label, color: "#0077BD" },
    } satisfies ChartConfig

    return (
      <div className="w-full p-4">
        {title && (
          <h3 className="mb-4 text-center text-lg font-extrabold text-slate-600">
            {title}
          </h3>
        )}

        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart
            layout="vertical"
            data={data}
            margin={{ left: 40 }}
          >
            {/* Y = categorías */}
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              axisLine={false}
              width={120}
            />

            {/* X = valores */}
            <XAxis
              type="number"
              tickLine={false}
              axisLine={false}
            />

            <Bar dataKey="count" fill="#0077BD" radius={4}>
              <LabelList
                dataKey="count"
                position="right"
                fill="#0077BD"
                fontSize={12}
                fontWeight="bold"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </div>
    )
  }


  return (
    <main className="flex w-full flex-col items-stretch bg-white">
      <PageHeading title="Estadístiques" subtitle="Dades agregades dels nostres garduats." />

      <div className="flex flex-wrap justify-center gap-2">
        <MetaPill label="Alumni" value={`${alumniCount}`} />
        <MetaPill label="Generacions" value={`${generationCount}`} />
      </div>

      <section className="py-10 text-center text-sm font-semibold md:text-base lg:text-lg">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-white" />
          <div className="absolute inset-x-0 top-0 h-px bg-slate-200/70" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-3 sm:px-4">
          <div className="text-center">
            <h2 className="mx-auto mt-4 mb-8 max-w-3xl text-slate-600">
              Algunes de les estadístiques més destacades
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur">
              <StatComponent value={pct(employedRate)} label="Dels nostres graduats tenen feina actualment" arrow="up" />
            </div>

            <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur">
              <StatComponent
                value={salaryMedian ? formatEUR(salaryMedian) : "—"}
                label="És el sou de més de la meitat dels nostres graduats"
                arrow="up"
              />
            </div>

            <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur">
              <StatComponent
                value={pct(internshipsRate)}
                label="Dels nostres graduats han fet pràctiques durant el grau"
                arrow="up"
              />
            </div>

            <div className="rounded-3xl bg-white/80 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur">
              <StatComponent value={pct(masterRate)} label="Dels nostres graduats han cursat un màster després del grau" arrow="up" />
            </div>
          </div>
        </div>
      </section>


      <div className="mx-auto w-full max-w-6xl px-3 sm:px-4">
        {averageDegreeScore !== null && (
          <section className="pt-10 text-center text-sm font-semibold md:text-base lg:text-lg">
            <h2 className="mx-auto mt-4 mb-8 max-w-3xl text-slate-600">La valoració del grau segons els nostres graduats</h2>
            <StarRating score={averageDegreeScore} />
            <div className="mt-2 text-sm text-slate-600 tabular-nums md:text-base lg:text-lg">
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
          <div
            id="mobilitat"
            className="relative overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-black/5 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="text-xl font-extrabold text-slate-900">
                Mobilitat internacional
              </h2>
              <MapPin className="h-5 w-5 text-slate-400" />
            </div>

            <div className="relative isolate z-0 h-[480px] overflow-hidden rounded-2xl">
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

      <section id="rankings" className="mt-10 border-t bg-gray-100 -mx-3 px-3 py-10 sm:-mx-4 sm:px-4">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Rankings i perfils</h2>
          </div>

          <div className="my-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CustomBarChart label="Dominis" data={topDomains} title="Àrees i dominis on treballen els nostres graduats" />
            <CustomBarChart label="Especialitat" data={topSpecialties} title="Especialitat de la feina dels nostres graduats" />
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto mt-10 w-full max-w-6xl px-4 pb-14">
          <div className="bg-upc mx-auto max-w-5xl rounded-3xl px-6 py-10 text-white shadow-sm ring-1 ring-black/10 sm:px-10">
            <h2 className="text-center text-2xl font-extrabold sm:text-3xl">Vols veure exemples de projectes?</h2>
            <p className="mx-auto mt-2 max-w-3xl text-center text-white/90">
              Descobreix projectes desenvolupats a la universitat i coneix als alumni, els seus interessos i projectes personals.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a className="text-upc inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 font-bold shadow-sm" href="/projectes">
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

      <section className="h-16" />
    </main>
  )
}
