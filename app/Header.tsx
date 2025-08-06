"use client"

import Image from "next/image"
import LogoUPC from "./LogoUPC.svg"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()

  const _Link = ({
    href,
    children,
  }: {
    href: string
    children: React.ReactNode
  }) => (
    <Link
      href={href}
      className={
        pathname === href ? "underline decoration-2 underline-offset-4" : ""
      }
    >
      {children}
    </Link>
  )

  return (
    <header className="flex flex-row gap-2 items-end px-[1em] py-[0.8em] shadow overflow-clip">
      <Link href="/">
        <Image src={LogoUPC} alt="Logo UPC" width={250} height={80} />
      </Link>
      <div className="flex-1" />
      <div className="flex flex-row gap-10 pr-10 text-[#007BC0] font-bold">
        <_Link href="/"> PÀGINA PRINCIPAL</_Link>
        <_Link href="/estadistiques">ESTADÍSTIQUES</_Link>
        <_Link href="/estudiants">ESTUDIANTS</_Link>
        <_Link href="/projectes">PROJECTES</_Link>
      </div>
    </header>
  )
}
