"use client"

import ImageGallery from "./ImageGallery"
import { cn } from "@/lib/utils"


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
    <div className="max-h-[80vh] overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <div
        className={cn(
          "rounded-xl bg-upc-muted overflow-hidden shadow-xl shadow-gray-300",
          "flex flex-col items-stretch transition-shadow duration-300 hover:shadow-2xl"
        )}
      >
        {/* Header */}
        <div className="px-20 pt-12 pb-6 flex flex-col gap-2 bg-white border-b border-gray-300">
          <div className="text-lg text-gray-600 font-semibold">{project.topic}</div>

          <h1 className="text-black text-left text-3xl leading-tight font-bold line-clamp-2">
            {project.name}
          </h1>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-6 p-8 items-start justify-between">
          {/* Gallery */}
          <div className="w-full md:w-[50%] bg-white rounded-lg shadow-md p-6">
            <ImageGallery projectImages={project.images} />
          </div>

          {/* Description */}
          <div className="w-full md:w-[45%] flex flex-col gap-3 text-left">
            <h3 className="text-sm font-semibold text-gray-800 border-b border-gray-300 pb-1">
              Descripció
            </h3>
            <p className="text-sm leading-relaxed text-gray-700">{project.description}</p>
          </div>
        </div>
      </div>
    </div>
      )
}