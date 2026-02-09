import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/logo-web-gced-white.svg"
import { Linkedin } from "lucide-react"

export default function Footer() {
  const authors = [
    { name: "Ignacio Gris Martín", linkedin: "https://www.linkedin.com/in/ignacio-gris-martin-68a57725a" },
    { name: "Maria Risques Montalban", linkedin: "https://www.linkedin.com/in/maria-risques-montalban" },
    { name: "Pau Fernández Durán", linkedin: "https://www.linkedin.com/in/pauek/" },
  ]

  return (
    <footer className="bg-upc mt-auto text-white">
      <div className="mx-auto flex min-h-[10em] flex-col items-start justify-between gap-4 px-6 py-6 lg:w-6xl lg:flex-row">
        <Link href="/">
          <Image src={Logo} alt="Logotip Web GCED" width={200} height={50} />
        </Link>

        <div className="flex flex-col items-start gap-2 lg:items-end">
          <div className="flex flex-col gap-1 items-start lg:items-end">
            {authors.map((author) => (
              <div key={author.name} className="flex items-center gap-2">
                <span className="text-xs text-white/70">{author.name}</span>
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={`LinkedIn de ${author.name}`}
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/50">© {new Date().getFullYear()} GCED - UPC</p>
        </div>
      </div>
    </footer>
  )
}
