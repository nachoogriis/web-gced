"use client"

import ProjectTitle from "./ProjectTitle"
import ImageGallery from "./ImageGallery"

interface ProjectInfo {
  id: number
  name: string
  summary: string
  description: string
  topic: string
  tags: string
  images: string
}

export default function FullProjectCard({ project }: { project: ProjectInfo }) {
  return (
    <div className="flex items-center justify-center max-h-none overflow-x-auto">
      <div className="flex flex-col  w-[95%] h-[95%]">
        <ProjectTitle title={project.name} />
        <div className="flex flex-col md:flex-row gap-10 items-center justify-center bg-gray-100 py-10 rounded-b-2xl">
          <ImageGallery projectImages={project.images}/>
          <div className="md:w-[45%] flex flex-col items-center justify-center gap-5 px-10">
            <p className="text-lg text-center">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
