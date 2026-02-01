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
    <div className="relative overflow-x-hidden">
      {/* Left fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent md:w-24 lg:w-32" />
      
      <div className={`flex gap-2 md:gap-4 lg:gap-8 ${animationClass}`} style={{ width: "max-content" }}>
        {logos.map((src, i) => (
          <CompanyLogo key={`${keyPrefix}-${i}`} image={src} />
        ))}
        {/* Duplicate for seamless loop */}
        {logos.map((src, i) => (
          <CompanyLogo key={`${keyPrefix}-dup-${i}`} image={src} />
        ))}
      </div>
      
      {/* Right fade overlay */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent md:w-24 lg:w-32" />
    </div>
  )
}

export default function CompanyLogos() {
  const jobLogos = getPublicLogos("job_logos")
  const internshipLogos = getPublicLogos("internship_logos")

  return (
    <div className="w-full text-center">
      <h2 className="mx-auto mt-4 mb-8 max-w-3xl text-slate-600">Els nostres estudiants treballen a</h2>
      <LogosRow logos={jobLogos} animationClass="animate-scroll" keyPrefix="job" />

      <h2 className="mx-auto mt-12 max-w-3xl text-slate-600">Els nostres estudiants fan pràctiques a</h2>
      <LogosRow logos={internshipLogos} animationClass="animate-scroll1 py-4" keyPrefix="intern" />
    </div>
  )
}
