// components/CompanyCard.tsx  (sin "use client")
import CompanyLogo from "@/components/Logo"
import { getPublicLogos } from "@/lib/getPublicLogos"

interface LogosRowProps {
  logos: string[]
  animationClass: string
  keyPrefix: string
}

function LogosRow({ logos, animationClass, keyPrefix }: LogosRowProps) {
  if (!logos.length) {
    return null
  }

  return (
    <div className="overflow-x-hidden">
      <div className={`flex gap-8 ${animationClass}`} style={{ width: "max-content" }}>
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

export default function CompanyLogos() {
  const jobLogos = getPublicLogos("job_logos")
  const internshipLogos = getPublicLogos("internship_logos")

  return (
    <div className="w-full text-center">
      <h2 className="mt-4 mb-8 text-slate-600 max-w-3xl mx-auto">
        Els nostres estudiants treballen a
      </h2>
      <LogosRow logos={jobLogos} animationClass="animate-scroll" keyPrefix="job" />

      <h2 className="mt-12 text-slate-600 max-w-3xl mx-auto">
        Els nostres estudiants fan pràctiques a
      </h2>
      <LogosRow logos={internshipLogos} animationClass="animate-scroll1 py-4" keyPrefix="intern" />
    </div>
  )
}
