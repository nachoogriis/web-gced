import { db } from "@/lib/db/db"

function pct(n: number) {
  return `${Math.round(n * 100)}%`
}

function safeRate(num: number, den: number) {
  return den ? num / den : 0
}

function median(values: number[]) {
  if (!values.length) return null
  const a = [...values].sort((x, y) => x - y)
  const mid = Math.floor(a.length / 2)
  return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2
}

function formatEUR(n: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n)
}

function parseSalaryAnnualEUR(s?: string | null) {
  if (!s) return null
  const cleaned = s.trim().replace(/\u00A0/g, " ").replace(/\./g, "").replace(/,/g, ".")
  const m = cleaned.match(/(\d{2,6}(\.\d+)?)/)
  if (!m) return null
  const n = Number(m[1])
  if (!Number.isFinite(n) || n <= 0) return null

  const isMonthly =
    /\/\s*mes|mensual|month|mo\b/i.test(cleaned) ||
    (n > 300 && n < 12000 && !/anual|year|año|\/\s*a/i.test(cleaned))

  return isMonthly ? n * 12 : n
}

interface StatProps {
  title: string
  value: string | number
}

function Stat({ title, value }: StatProps) {
  return (
    <div className="text-center">
      <p className="text-sm font-semibold text-white/90">{title}</p>
      <p className="mt-2 text-4xl font-extrabold md:text-5xl">{value}</p>
    </div>
  )
}

export default async function BannerMainStats() {
  const [alumniCount, alumniRows, alumniWithInternship, alumniWithMaster] = await Promise.all([
    db.alumni.count(),
    db.alumni.findMany({
      select: {
        currentJob: true,
        currentOrganization: true,
        currentJobSalary: true,
      },
    }),
    db.internshipAlumni
      .findMany({ select: { alumniId: true }, distinct: ["alumniId"] })
      .then((rows) => rows.length),
    db.masterAlumni
      .findMany({ select: { alumniId: true }, distinct: ["alumniId"] })
      .then((rows) => rows.length),
  ])

  const employedRate = safeRate(
    alumniRows.filter((a) => Boolean(a.currentJob || a.currentOrganization)).length,
    alumniCount
  )

  const internshipsRate = safeRate(alumniWithInternship, alumniCount)
  const masterRate = safeRate(alumniWithMaster, alumniCount)

  const salaryValues = alumniRows
    .map((a) => parseSalaryAnnualEUR(a.currentJobSalary))
    .filter((x): x is number => typeof x === "number" && x > 0)

  const salaryMedian = median(salaryValues)

  return (
    <section className="bg-upc py-8">
      <div className="mx-auto max-w-6xl px-4 lg:w-6xl">
        <div className="grid grid-cols-2 gap-4 text-white md:grid-cols-4">
          <Stat title="Ocupabilitat" value={pct(employedRate)} />
          <Stat title="Sou mediana" value={salaryMedian !== null ? formatEUR(salaryMedian) : "—"} />
          <Stat title="Han fet pràctiques" value={pct(internshipsRate)} />
          <Stat title="Han fet màster" value={pct(masterRate)} />
        </div>
      </div>
    </section>
  )
}
