"use client"

import { UniversityProject } from "@prisma/client"
import { useState } from "react"
import ProjectCard from "./ProjectCard"
import { Button } from "@/components/ui/button"

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

  const filteredProjects = projects.filter((project) => !topic || project.topic === topic)

  if (filteredProjects.length === 0) {
    return <div className="flex items-center jusitify center">No projects have been defined yet for this category</div>
  }

  const toggleTopic = (topic: string) => () => {
    setTopic((prevTopic) => {
      if (prevTopic === undefined) {
        return topic
      } else {
        return topic === prevTopic ? undefined : topic
      }
    })
  }

  return (
    <>
      <div className="mt-6 px-6 flex flex-row items-center text-foreground/70 text-sm gap-4">
        <span>Filtra els projectes:</span>
        <div className="flex flex-row gap-2">
          {options.map(({ key, text }) => (
            <Button
              key={key}
              variant={key === topic ? "default" : "secondary"}
              className="rounded-full cursor-pointer"
              onClick={toggleTopic(key)}
            >
              {text}
            </Button>
          ))}
        </div>
      </div>
      <div className="mt-2 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-100 rounded py-6 px-6 justify-center items-center">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </>
  )
}
