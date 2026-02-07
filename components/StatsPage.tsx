// Server Component (Prisma) — data fetching only

import { db } from "@/lib/db/db"
import { getPublicLogos } from "@/lib/getPublicLogos"
import StatsPageClient from "./StatsPageClient"

type CountItem = { count: number; label: string }
type TopItem = { name: string; count: number }

function safeRate(num: number, den: number) {
  return den ? num / den : 0
}

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
  return a.length % 2 ? a[mid] : (a[mid - 1] + a[mid]) / 2
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

function avg(values: number[]) {
  return values.length ? values.reduce((sum, x) => sum + x, 0) / values.length : null
}

export default async function StatsPage() {
  const [alumniCount, alumniRows] = await Promise.all([
    db.alumni.count(),
    db.alumni.findMany({
      select: {
        generation: true,
        currentJob: true,
        currentOrganization: true,
        currentJobKeywordsDomain: true,
        currentJobKeywordsSpecialty: true,
        currentJobSalary: true,
        hasMobility: true,
        mobilityCountry: true,
        degreeScore: true,
      },
    }),
  ])

  const generationCount = new Set(alumniRows.map((a) => a.generation).filter(Boolean)).size

  const withJob = alumniRows.filter((a) => Boolean(a.currentJob || a.currentOrganization)).length
  const employedRate = safeRate(withJob, alumniCount)

  const salaryValues = alumniRows
    .map((a) => parseSalaryAnnualEUR(a.currentJobSalary))
    .filter((x): x is number => typeof x === "number" && x > 0)
  const salaryMedian = median(salaryValues)

  const degreeScores = alumniRows
    .map((a) => a.degreeScore)
    .filter((x): x is number => typeof x === "number" && x > 0)
  const averageDegreeScore = avg(degreeScores)

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

  const domainMap = new Map<string, CountItem>()
  for (const a of alumniRows) {
    for (const kw of splitKeywords(a.currentJobKeywordsDomain)) {
      const key = normalizeKey(kw)
      const prev = domainMap.get(key)
      if (prev) prev.count += 1
      else domainMap.set(key, { count: 1, label: displayName(kw) })
    }
  }
  const topDomains = toTop(domainMap, 10)

  const specialtyMap = new Map<string, CountItem>()
  for (const a of alumniRows) {
    for (const kw of splitKeywords(a.currentJobKeywordsSpecialty)) {
      const key = normalizeKey(kw)
      const prev = specialtyMap.get(key)
      if (prev) prev.count += 1
      else specialtyMap.set(key, { count: 1, label: displayName(kw) })
    }
  }
  const topSpecialties = toTop(specialtyMap, 10)

  const jobLogos = getPublicLogos("job_logos")
  const internshipLogos = getPublicLogos("internship_logos")

  const [alumniWithInternship, alumniWithMaster] = await Promise.all([
    db.internshipAlumni
      .findMany({ select: { alumniId: true }, distinct: ["alumniId"] })
      .then((rows) => rows.length),
    db.masterAlumni
      .findMany({ select: { alumniId: true }, distinct: ["alumniId"] })
      .then((rows) => rows.length),
  ])

  const internshipsRate = safeRate(alumniWithInternship, alumniCount)
  const masterRate = safeRate(alumniWithMaster, alumniCount)

  return (
    <StatsPageClient
      alumniCount={alumniCount}
      generationCount={generationCount}
      employedRate={employedRate}
      salaryMedian={salaryMedian}
      averageDegreeScore={averageDegreeScore}
      internshipsRate={internshipsRate}
      masterRate={masterRate}
      topMobilityCountries={topMobilityCountries}
      topDomains={topDomains}
      topSpecialties={topSpecialties}
      jobLogos={jobLogos}
      internshipLogos={internshipLogos}
    />
  )
}
