"use client"

import AlumniCard from "@/components/alumni_card/AlumniCard"
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
    const search = e.target.value.toLowerCase()
    setSearchTerm(e.target.value)

    const isSimilar = (word1: string, word2: string, threshold = 1) => {
      return levenshteinDistance(word1, word2) <= threshold
    }

    const results = initialAlumniData.filter((alumni) => {
      const combinedData = [
        `${alumni.firstName || ""} ${alumni.lastName || ""}`,
        String(alumni.generation || ""),
        String(alumni.tfgTitle || ""),
        ...(alumni.internships || []).flatMap((internship) => [
          String(internship.position || ""),
          String(internship.organization || ""),
        ]),
        ...(alumni.masters || []).map((master) => String(master.name || "")),
      ]
        .join(" ")
        .toLowerCase()

      return search
        .toLowerCase()
        .split(" ")
        .every((term: string) =>
          combinedData.split(" ").some((dataWord) => isSimilar(term, dataWord))
        )
    })

    setFilteredAlumni(results)
  }

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-[#007BC0] pt-10">
        Estudiants
      </h1>

      {/* Buscador con ShadCN UI */}
      <div className="flex flex-col items-center mb-6 py-10">
        <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-lg">
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="🔍 Busca per paraules clau. Per exemple: Juan Perez Computer Vision..."
            className="w-full rounded-full border-gray-300"
          />
        </form>
      </div>

      {/* Tarjetas de alumnos */}
      {filteredAlumni.length > 0 && (
        <section className="flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-100 rounded px-6 py-6 w-[95%]">
            {filteredAlumni.map((alumni) => (
              <AlumniCard key={alumni.id} alumni={alumni} />
            ))}
          </div>
        </section>
      )}

      {/* Mensaje si no hay resultados */}
      {filteredAlumni.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No s&apos;han trobat resultats per a &quot;{searchTerm}&quot;.
        </p>
      )}
    </main>
  )
}
