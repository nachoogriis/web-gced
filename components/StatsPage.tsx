// Server Component (Prisma) — data fetching only

import { db } from "@/lib/db/db"
import { getPublicLogos } from "@/lib/getPublicLogos"
import StatsPageClient from "./StatsPageClient"

type CountItem = { count: number; label: string }
type TopItem = { name: string; count: number }

function safeRate(num: number, den: number) {
  if (!den) return 0
  return num / den
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
  if (a.length % 2 === 1) return a[mid]
  return (a[mid - 1] + a[mid]) / 2
}

function parseSalaryAnnualEUR(s?: string | null) {
  if (!s) return null
  const cleaned = s
    .trim()
    .replace(/\u00A0/g, " ")
    .replace(/\./g, "")
    .replace(/,/g, ".")

  const m = cleaned.match(/(\d{2,6}(\.\d+)?)/)
  if (!m) return null
  const n = Number(m[1])
  if (!Number.isFinite(n) || n <= 0) return null

  const isMonthly =
    /\/\s*mes|mensual|month|mo\b/i.test(cleaned) || (n > 300 && n < 12000 && !/anual|year|año|\/\s*a/i.test(cleaned))

  return isMonthly ? n * 12 : n
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

  const withJob = alumniRows.filter((a) => Boolean(a.currentJob || a.currentOrganization)).length
  const employedRate = safeRate(withJob, alumniCount)

  const gcedRelatedYes = alumniRows.filter((a) => {
    const v = (a.currentJobRelatedToGCED || "").trim().toLowerCase()
    return v === "yes" || v === "si" || v === "sí" || v === "true" || v === "1"
  }).length
  const gcedRelatedRate = safeRate(gcedRelatedYes, alumniCount)

  const mobilityYes = alumniRows.filter((a) => {
    if (a.hasMobility === true) return true
    const c = (a.mobilityCountry || "").trim()
    if (c && c.toLowerCase() !== "spain" && c.toLowerCase() !== "españa" && c.toLowerCase() !== "espanya") return true
    return false
  }).length
  const mobilityRate = safeRate(mobilityYes, alumniCount)

  const alumniWithInternship = await db.internshipAlumni
    .findMany({ select: { alumniId: true }, distinct: ["alumniId"] })
    .then((rows) => rows.length)
  const internshipsRate = safeRate(alumniWithInternship, alumniCount)

  const alumniWithMaster = await db.masterAlumni
    .findMany({ select: { alumniId: true }, distinct: ["alumniId"] })
    .then((rows) => rows.length)
  const masterRate = safeRate(alumniWithMaster, alumniCount)

  const salaryValues = alumniRows
    .map((a) => parseSalaryAnnualEUR(a.currentJobSalary))
    .filter((x): x is number => typeof x === "number" && x > 0)

  const salaryMedian = median(salaryValues)

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

  const jobLogos = getPublicLogos("job_logos")
  const internshipLogos = getPublicLogos("internship_logos")

  return (
    <StatsPageClient
      alumniCount={alumniCount}
      generationCount={generationCount}
      employedRate={employedRate}
      salaryMedian={salaryMedian}
      gcedRelatedRate={gcedRelatedRate}
      internshipsRate={internshipsRate}
      masterRate={masterRate}
      mobilityRate={mobilityRate}
      topMobilityCountries={topMobilityCountries}
      topInternships={topInternships}
      topJobs={topJobs}
      topMasters={topMasters}
      topDomains={topDomains}
      topSpecialties={topSpecialties}
      maxIntern={maxIntern}
      maxJobs={maxJobs}
      maxMasters={maxMasters}
      maxDomains={maxDomains}
      maxSpecialties={maxSpecialties}
      salaryValues={salaryValues}
      jobLogos={jobLogos}
      internshipLogos={internshipLogos}
    />
  )
}
