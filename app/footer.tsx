import Image from "next/image"
import Link from "next/link"
import Logo from "@/assets/logo-web-gced-white.svg"

export default function Footer() {
  return (
    <footer className="bg-upc mt-auto text-white">
      <div className="mx-auto flex h-[10em] flex-col items-start justify-between gap-4 px-6 py-6 lg:w-6xl lg:flex-row">
        <Link href="/">
          <Image src={Logo} alt="Logotip Web GCED" width={200} height={50} />
        </Link>

        <p className="text-xs text-white/50">© {new Date().getFullYear()} GCED - UPC</p>
      </div>
    </footer>
  )
}
