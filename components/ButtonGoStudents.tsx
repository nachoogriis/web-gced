"use client"

import { useRouter } from "next/navigation"
import { Button } from "./ui/button"

export default function ButtonGoStudents() {
  const router = useRouter()
  return (
    <Button variant="default" className="bg-upc" onClick={() => router.push("/estudiants")}>
      Veure més perfils d&apos;estudiants...
    </Button>
  )
}
