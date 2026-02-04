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

function splitTags(tags?: string) {
  if (!tags) return []

  return (
    tags
      .match(/\[([^\]]+)\]/g) // extrae [tag]
      ?.map((t) => t.slice(1, -1)) // quita [ ]
      .map((t) => t.trim())
      .filter(Boolean)
      .slice(0, 4) || []
  )
}

export default function ProjectCard({ project }: { project: ProjectInfo }) {
  const image_paths = project.images.match(/\[([^\]]+)\]/g)?.map((str) => str.slice(1, -1)) || []
  const image_path = image_paths[0] ? `/projects/${image_paths[0]}` : "/projects/placeholder.png"

  const tags = splitTags(project.tags)

  return (
    <FullProjectDialog project={project}>
      <article
        className={cn(
          "group relative cursor-pointer overflow-hidden rounded-3xl select-none",
          "bg-white shadow-sm ring-1 ring-black/5",
          "transition-all duration-200",
          "hover:-translate-y-0.5 hover:shadow-lg hover:ring-black/10",
        )}
      >
        {/* Media (hero) */}
        <div className="relative aspect-video bg-slate-100">
          <Image
            src={image_path}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Topic pill */}
          <div className="absolute top-4 left-4">
            <span className="text-upc inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold ring-1 ring-black/5 backdrop-blur">
              {project.topic}
            </span>
          </div>

          {/* Title on image */}
          <div className="absolute right-0 bottom-0 left-0 p-5">
            <h2 className="line-clamp-2 text-xl leading-snug font-extrabold text-white drop-shadow md:text-2xl">
              {project.name}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-700">{project.summary}</p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-300 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </FullProjectDialog>
  )
}
