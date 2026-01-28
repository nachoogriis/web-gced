// components/CompanyCard.tsx  (sin "use client")
import CompanyLogo from "@/components/CompanyLogo"
import { getPublicLogos } from "@/lib/getPublicLogos"

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
    <div className="overflow-x-hidden">
      <div className={`flex gap-4 ${animationClass}`} style={{ width: "max-content" }}>
        {logos.map((src, i) => (
          <CompanyLogo key={`${keyPrefix}-${i}`} image={src} />
        ))}
        {/* Duplicate for seamless loop */}
        {logos.map((src, i) => (
          <CompanyLogo key={`${keyPrefix}-dup-${i}`} image={src} />
        ))}
      </div>
    </div>
  )
}

export default function CompanyCard() {
  const jobLogos = getPublicLogos("job_logos")
  const internshipLogos = getPublicLogos("internship_logos")

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-base md:text-lg lg:text-xl font-bold mb-4 text-center">
        Els nostres estudiants treballen a
      </h2>

      <LogosRow logos={jobLogos} animationClass="animate-scroll" keyPrefix="job" />

      <h2 className="text-base md:text-lg lg:text-xl font-bold mb-4 text-center pt-6">
        Els nostres estudiants fan pràctiques a
      </h2>

      <LogosRow logos={internshipLogos} animationClass="animate-scroll1 py-4" keyPrefix="intern" />
    </div>
  )
}
