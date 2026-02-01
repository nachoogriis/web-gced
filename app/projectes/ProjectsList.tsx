"use client"

import { UniversityProject } from "@/generated/prisma/client"
import { useMemo, useState } from "react"
import ProjectCard from "./ProjectCard"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const options = [
  { key: "APs", text: "Algorísima i Programació" },
  { key: "DL", text: "Deep Learning" },
  { key: "Others", text: "Altres" },
]

interface Props {
  universityProjects: UniversityProject[]
}

export default function ProjectsList({ universityProjects: projects }: Props) {
  const [topic, setTopic] = useState<string | undefined>()

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => !topic || project.topic === topic)
  }, [projects, topic])

  const toggleTopic = (t: string) => () => {
    setTopic((prev) => (prev === t ? undefined : t))
  }

  return (
    <div className="flex w-full flex-col items-stretch">
      {/* Título como /estudiants */}

      {/* Filtros (centrados) */}
      <section className="flex items-center justify-center pb-4">
        <div className="w-full max-w-3xl px-2">
          <div className={cn("flex flex-col gap-3 md:flex-row md:items-center md:justify-center")}>
            {/* <span className="text-center text-sm font-semibold text-slate-600 md:text-left">Filtra els projectes:</span> */}
            <div className="flex flex-wrap justify-center gap-2">
              {options.map(({ key, text }) => (
                <Button
                  key={key}
                  color="var(--upc-color)"
                  variant={key === topic ? "default" : "secondary"}
                  className={cn("cursor-pointer rounded-full uppercase text-sm h-8", key === topic && "bg-upc hover:bg-upc/90 text-white")}
                  onClick={toggleTopic(key)}
                >
                  {text}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid como /estudiants (fondo gris + contenedor centrado) */}
      <section className="flex items-start justify-center border-t bg-gray-100 pb-20 min-h-[56em]">
        <div className="w-full max-w-6xl px-4 py-10">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={index} project={project as any} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
