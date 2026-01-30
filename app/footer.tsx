import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/logo-web-gced-white.svg"

export default function Footer() {
  return (
    <footer className="bg-upc text-white mt-auto">
      <div className="lg:w-6xl h-[10em] mx-auto px-6 py-6 flex flex-col lg:flex-row items-start justify-between gap-4">
        <Link href="/">
          <Image src={Logo} alt="Logotip Web GCED" width={200} height={50} />
        </Link>

        <p className="text-xs text-white/50">© {new Date().getFullYear()} GCED - UPC</p>
      </div>
    </footer>
  )
}
