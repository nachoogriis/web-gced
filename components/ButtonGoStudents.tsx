"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

interface ButtonGoProps {
  text: string
  href: string
}

export default function ButtonGo({ text, href }: ButtonGoProps) {
  const router = useRouter()
  return (
    <Button variant="default" className="bg-upc px-6 py-6 text-lg font-semibold" onClick={() => router.push(href)}>
      {text}
    </Button>
  )
}
