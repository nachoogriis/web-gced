"use client"

import AlumniCard from "@/components/alumni_card/AlumniCard"
import PageHeading from "@/components/PageHeading"
import { Input } from "@/components/ui/input"
import { AlumniCardInfo } from "@/lib/db/alumni"
import { levenshteinDistance } from "@/lib/utils"
import { ChangeEventHandler, useState } from "react"

type Props = {
  initialAlumniData: AlumniCardInfo[]
}
export default function AlumniPage({ initialAlumniData }: Props) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredAlumni, setFilteredAlumni] = useState(initialAlumniData)

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const raw = e.target.value
    const search = raw.toLowerCase()
    setSearchTerm(raw)

    const isSimilar = (term: string, dataWord: string, threshold = 1) => {
      const isNumericTerm = /^\d+$/.test(term)
      const isNumericData = /^\d+$/.test(dataWord)

      if (isNumericTerm && isNumericData) return term === dataWord

      if (isNumericTerm || isNumericData) return false

      return levenshteinDistance(term, dataWord) <= threshold
    }

    const results = initialAlumniData.filter((alumni) => {
      const combinedData = [
        `${alumni.firstName || ""} ${alumni.lastName || ""}`,
        String(alumni.generation ?? ""),
        String(alumni.tfgTitle || ""),
        ...(alumni.internships || []).flatMap((internship: AlumniCardInfo["internships"][number]) => [
          String(internship.position || ""),
          String(internship.organization || ""),
        ]),
        ...(alumni.masters || []).map((master: AlumniCardInfo["masters"][number]) => String(master.name || "")),
      ]
        .join(" ")
        .toLowerCase()

      const dataWords = combinedData.split(/\s+/).filter(Boolean)

      return search
        .split(/\s+/)
        .filter(Boolean)
        .every((term) => dataWords.some((dataWord) => isSimilar(term, dataWord)))
    })

    setFilteredAlumni(results)
  }

  return (
    <main className="flex w-full flex-col items-stretch">
      <PageHeading title="Estudiants" />

      {/* Buscador con ShadCN UI */}
      <div className="flex flex-col items-center py-6">
        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-lg">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="🔍 Busca per paraules clau. Per exemple: Juan Perez Computer Vision..."
            className="w-full px-4 rounded-full border-gray-300"
          />
        </form>
      </div>

      {/* Tarjetas de alumnos */}
      {filteredAlumni.length > 0 && (
        <section className="flex items-start justify-center border-t bg-gray-100 pb-20 min-h-[56em]">
          <div className="flex max-w-6xl flex-wrap justify-center gap-6 rounded px-2 py-8">
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>
        </section>
      )}

      {/* Mensaje si no hay resultados */}
      {filteredAlumni.length === 0 && (
        <section className="flex items-start justify-center border-t bg-gray-100 pb-20 min-h-[56em]">
          <p className="mt-12 text-center text-gray-400">No s&apos;han trobat resultats per a &quot;{searchTerm}&quot;.</p>
        </section>
      )}
    </main>
  )
}
