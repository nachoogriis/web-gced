import CompanyLogo from "@/components/CompanyLogo"

export default function CompanyCard() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <h2 className="text-base md:text-lg lg:text-xl font-bold mb-4 text-center">Els nostres estudiants treballen a</h2>
      <div className="overflow-x-hidden">
        <div
          className="flex gap-4 animate-scroll"
          style={{
            width: "max-content",
          }}
        >
          {Array(24)
            .fill("/google.png")
            .map((src, index) => (
              <CompanyLogo key={`logo1-${index}`} image={src} />
            ))}
          {/* Duplicate for seamless loop */}
          {Array(24)
            .fill("/google.png")
            .map((src, index) => (
              <CompanyLogo key={`logo1-dup-${index}`} image={src} />
            ))}
        </div>
      </div>
      <h2 className="text-base md:text-lg lg:text-xl font-bold mb-4 text-center pt-6">
        Els nostres estudiants fan pràctiques a
      </h2>
      <div className="overflow-x-hidden">
        <div
          className="flex gap-4 animate-scroll1 py-4"
          style={{
            width: "max-content",
          }}
        >
          {Array(24)
            .fill("/google.png")
            .map((src, index) => (
              <CompanyLogo key={`logo2-${index}`} image={src} />
            ))}
          {/* Duplicate for seamless loop */}
          {Array(24)
            .fill("/google.png")
            .map((src, index) => (
              <CompanyLogo key={`logo2-dup-${index}`} image={src} />
            ))}
        </div>
      </div>
    </div>
  )
}
