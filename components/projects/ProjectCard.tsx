import Image from "next/image"
import FullProjectDialog from "./full_card/FullProjectDialog"

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
  const image_paths = project.images.match(/\[([^\]]+)\]/g)?.map(str => str.slice(1, -1)) || [];
  const image_path = `/projects/${image_paths[0]}`;

  return (
    <div className="relative flex flex-row items-center w-[100%] bg-white group rounded-[10px] border border-[#B0DAED] gap-4 p-4">
      <Image
        width={651}
        height={465}
        src={image_path}
        alt={project.topic}
        className="hidden md:block h-[200px] w-auto rounded-tl-[10px] rounded-bl-[10px]"
      />
      <div className="flex flex-col items-center justify-center gap-5 mr-4 line-clamp-4">
        <div className="text-center">
          <h2 className="text-xl font-bold">{project.name}</h2>
          <p className="text-gray-700 line-clamp-3">{project.summary}</p>
        </div>
        <FullProjectDialog project={project} />
      </div>
    </div>
  )
}
