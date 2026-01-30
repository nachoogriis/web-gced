// components/BannerMainStats.tsx  (SIN "use client")

import { db } from "@/lib/db/db"

function pct(n: number) {
  return `${Math.round(n * 100)}%`
}

function safeRate(num: number, den: number) {
  if (!den) return 0
  return num / den
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
    <section className="bg-upc py-10">
      <div className="w-full max-w-[1500px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-white">
          <div className="text-center">
            <p className="text-sm font-semibold text-white/90">Ocupabilitat</p>
            <p className="mt-2 text-4xl md:text-5xl font-extrabold">{pct(employedRate)}</p>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-white/90">Feina dades / IA</p>
            <p className="mt-2 text-4xl md:text-5xl font-extrabold">{pct(gcedRelatedRate)}</p>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-white/90">Alumni registrats</p>
            <p className="mt-2 text-4xl md:text-5xl font-extrabold">{alumniCount}</p>
          </div>

          <div className="text-center">
            <p className="text-sm font-semibold text-white/90">Generacions</p>
            <p className="mt-2 text-4xl md:text-5xl font-extrabold">—</p>
          </div>
        </div>
      </div>
    </section>
  )
}
