import CompanyLogo from "@/components/CompanyLogo";

export default function CompanyCard() {
  return (
    <div>
      <h2 className="py-4 text-center text-xl font-bold">
        Els nostres estudiants treballen a
      </h2>

      <div
        className="flex gap-4 justify-center animate-scroll"
        style={{
          width: "calc(200% + 1rem)",
        }}
      >
        {Array(24)
          .fill("/google.png")
          .map((src, index) => (
            <CompanyLogo key={`logo1-${index}`} image={src} />
          ))}
      </div>

      <h2 className="pt-4 text-center text-xl font-bold">
        Els nostres estudiants fan pràctiques a
      </h2>

      <div
        className="flex gap-4 justify-center animate-scroll1 py-4"
        style={{
          width: "calc(200% + 1rem)",
        }}
      >
        {Array(24)
          .fill("/google.png")
          .map((src, index) => (
            <CompanyLogo key={`logo2-${index}`} image={src} />
          ))}
      </div>

    </div>
  );
}
