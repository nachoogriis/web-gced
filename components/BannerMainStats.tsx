// components/BannerMainStats.tsx  (SIN "use client")

import { db } from "@/lib/db/db"

function pct(n: number) {
  return `${Math.round(n * 100)}%`
}

function safeRate(num: number, den: number) {
  if (!den) return 0
  return num / den
}

interface StatProps {
  title: string
  value: string | number
}
function Stat({ title, value }: StatProps) {
  return (<div className="text-center">
    <p className="text-sm font-semibold text-white/90">{title}</p>
    <p className="mt-2 text-4xl md:text-5xl font-extrabold">{value}</p>
  </div>)
}


export default async function BannerMainStats() {
  const [alumniCount, alumniRows] = await Promise.all([
    db.alumni.count(),
    db.alumni.findMany({
      select: {
        currentJob: true,
        currentOrganization: true,
        currentJobRelatedToGCED: true,
      },
    }),
  ])

  const withJob = alumniRows.filter((a) => Boolean(a.currentJob || a.currentOrganization)).length
  const employedRate = safeRate(withJob, alumniCount)

  const gcedRelatedYes = alumniRows.filter((a) => {
    const v = (a.currentJobRelatedToGCED || "").trim().toLowerCase()
    return v === "yes" || v === "si" || v === "sí" || v === "true" || v === "1"
  }).length
  const gcedRelatedRate = safeRate(gcedRelatedYes, alumniCount)

  return (
    <section className="bg-upc py-8">
      <div className="max-w-[1500px] mx-auto px-4 lg:w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
          <Stat title="Ocupabilitat" value={pct(employedRate)} />
          <Stat title="Feina dades / IA" value={pct(gcedRelatedRate)} />
          <Stat title="Alumni registrats" value={alumniCount} />
          <Stat title="Generacions" value="—" />
        </div>
      </div>
    </section>
  )
}
