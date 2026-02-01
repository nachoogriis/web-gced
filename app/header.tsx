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
        "active:bg-upc w-full p-6 py-10 hover:bg-gray-50 active:text-white",
        "lg:w-auto lg:p-0 lg:hover:bg-inherit lg:active:bg-inherit lg:active:text-inherit",
      )}
    >
      {children}
    </Link>
  )
  return (
    <header className={cn("h-20 px-0 py-[0.8em] shadow-lg", "relative")}>
      <div className="mx-auto flex flex-row items-end gap-2 px-3 lg:w-6xl lg:px-0">
        <Link href="/">
          <Image src={Logo} alt="Logotip Web GCED" width={225} height={55} />
        </Link>

        <div onClick={toggleVisible} className="flex flex-1 cursor-pointer flex-row justify-end lg:hidden">
          <Menu className="text-upc mx-2 h-13 w-10" />
        </div>
        <div
          className={cn(
            "text-upc justify-end font-bold lg:static lg:flex lg:flex-1 lg:flex-row lg:gap-10 lg:p-0 lg:shadow-none",
            "absolute top-20 right-0 min-w-80 flex-col items-end bg-white p-0 shadow",
            visible ? "z-50 flex" : "hidden",
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
