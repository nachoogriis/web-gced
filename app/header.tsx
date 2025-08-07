"use client"

import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import LogoUPC_full from "./LogoUPC-full.svg"

export default function Header() {
  const pathname = usePathname()
  const [visible, setVisible] = useState<boolean>(false)

  const toggleVisible = () => setVisible((x) => !x)

  type Props = {
    href: string
    children: React.ReactNode
  }
  const MenuItem_ = ({ href, children }: Props) => (
    <Link
      href={href}
      onClick={(ev) => {
        console.log("hi!")
        setVisible(false)
      }}
      className={cn(
        pathname === href ? "underline decoration-2 underline-offset-4" : "",
        "py-10 p-6 hover:bg-gray-50 w-full active:bg-[#007BC0] active:text-white",
        "lg:p-0 lg:w-auto lg:hover:bg-inherit lg:active:bg-inherit lg:active:text-inherit",
      )}
    >
      {children}
    </Link>
  )
  return (
    <header
      className={cn(
        "h-20 flex flex-row gap-2 items-end px-[1em] py-[0.8em]",
        "shadow",
        "relative",
      )}
    >
      <Link href="/">
        <Image src={LogoUPC_full} alt="Logo UPC" width={250} height={80} />
      </Link>

      <div
        onClick={toggleVisible}
        className="lg:hidden flex-1 flex flex-row justify-end cursor-pointer"
      >
        <Menu className="text-[#007BC0] w-10 h-13" />
      </div>
      <div
        className={cn(
          "lg:flex lg:flex-1 lg:flex-row justify-end lg:static lg:p-0 lg:gap-10 text-[#007BC0] font-bold lg:shadow-none",
          "min-w-80 flex-col items-end absolute top-20 right-0 bg-white p-0 shadow",
          visible ? "flex z-50" : "hidden",
        )}
      >
        <MenuItem_ href="/"> PÀGINA PRINCIPAL</MenuItem_>
        <MenuItem_ href="/estadistiques">ESTADÍSTIQUES</MenuItem_>
        <MenuItem_ href="/estudiants">ESTUDIANTS</MenuItem_>
        <MenuItem_ href="/projectes">PROJECTES</MenuItem_>
      </div>
    </header>
  )
}
