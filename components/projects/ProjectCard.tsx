import Image from "next/image"
import FullProjectDialog from "./full_card/FullProjectDialog"
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

export default function ProjectCard({ project }: { project: ProjectInfo }) {
  const image_paths = project.images.match(/\[([^\]]+)\]/g)?.map((str) => str.slice(1, -1)) || []
  const image_path = `/projects/${image_paths[0]}`

  return (
    <FullProjectDialog project={project}>
      <div
        className={cn(
          "rounded-xl bg-upc-muted overflow-hidden shadow-xl shadow-gray-300",
          "flex flex-col items-stretch gap-[0.4em]",
          "hover:outline-4 outline-[#B0DAED] cursor-pointer",
          "select-none"
        )}
      >
        {/* Parte superior: título, topic, botón */}
        <div className="p-6 pb-1 flex flex-col gap-2 bg-white border-b">
          <div className="flex flex-row justify-between items-start">
            {/* Título y tópico */}
            <div className="flex flex-col gap-1">
              <div className="text-sm text-gray-600 font-semibold">{project.topic}</div>
              <h2 className="text-2xl font-bold leading-snug text-black line-clamp-2 min-h-[4.5rem]">
                {project.name}
              </h2>
            </div>

            {/* Botón "Saber més" */}
            <button className="text-sm text-[#4BADD9] hover:underline mt-1 whitespace-nowrap">
              Saber més →
            </button>
          </div>
        </div>

        {/* Parte inferior: imagen y resumen */}
        <div className="flex flex-row gap-4 justify-start items-center p-4 pt-2.5">
          <Image
            width={180}
            height={140}
            src={image_path}
            alt={project.topic}
            className="rounded-lg object-contain w-[180px] h-[140px] bg-white"
          />
          <p className="text-sm text-gray-700 line-clamp-4 pr-2">{project.summary}</p>
        </div>
      </div>
    </FullProjectDialog>
  )
}