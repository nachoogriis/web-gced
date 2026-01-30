"use client"

import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import Logo from "@/assets/logo-web-gced-optimized.svg"

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
        "py-10 p-6 hover:bg-gray-50 w-full active:bg-upc active:text-white",
        "lg:p-0 lg:w-auto lg:hover:bg-inherit lg:active:bg-inherit lg:active:text-inherit",
      )}
    >
      {children}
    </Link>
  )
  return (
    <header className={cn(
      "h-20 px-0 py-[0.8em] shadow-lg",
      "relative",
    )}>
      <div className="w-6xl mx-auto flex flex-row gap-2 items-end ">
        <Link href="/">
          <Image src={Logo} alt="Logotip Web GCED" width={225} height={55} />
        </Link>

        <div onClick={toggleVisible} className="lg:hidden flex-1 flex flex-row justify-end cursor-pointer">
          <Menu className="text-upc w-10 h-13" />
        </div>
        <div
          className={cn(
            "lg:flex lg:flex-1 lg:flex-row justify-end lg:static lg:p-0 lg:gap-10 text-upc font-bold lg:shadow-none",
            "min-w-80 flex-col items-end absolute top-20 right-0 bg-white p-0 shadow",
            visible ? "flex z-50" : "hidden",
          )}
        >
          <MenuItem_ href="/"> PÀGINA PRINCIPAL</MenuItem_>
          <MenuItem_ href="/estadistiques">ESTADÍSTIQUES</MenuItem_>
          <MenuItem_ href="/estudiants">ESTUDIANTS</MenuItem_>
          <MenuItem_ href="/projectes">PROJECTES</MenuItem_>
        </div>
      </div>
    </header>
  )
}
