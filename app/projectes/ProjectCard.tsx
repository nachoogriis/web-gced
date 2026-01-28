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

  return tags
    .match(/\[([^\]]+)\]/g)      // extrae [tag]
    ?.map(t => t.slice(1, -1))   // quita [ ]
    .map(t => t.trim())
    .filter(Boolean)
    .slice(0, 4) || []
}


export default function ProjectCard({ project }: { project: ProjectInfo }) {
  const image_paths =
    project.images.match(/\[([^\]]+)\]/g)?.map((str) => str.slice(1, -1)) || []
  const image_path = image_paths[0] ? `/projects/${image_paths[0]}` : "/projects/placeholder.png"

  const tags = splitTags(project.tags)

  return (
    <FullProjectDialog project={project}>
      <article
        className={cn(
          "group cursor-pointer select-none overflow-hidden rounded-3xl",
          "bg-white ring-1 ring-black/5 shadow-sm",
          "transition-all duration-200",
          "hover:-translate-y-0.5 hover:shadow-lg hover:ring-black/10",
        )}
      >
        {/* Media (hero) */}
        <div className="relative aspect-[16/9] bg-slate-100">
          <Image
            src={image_path}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={false}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          {/* Topic pill */}
          <div className="absolute left-4 top-4">
            <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-upc ring-1 ring-black/5 backdrop-blur">
              {project.topic}
            </span>
          </div>

          {/* CTA */}
          <div className="absolute right-4 top-4">
            <span className="inline-flex items-center rounded-full bg-upc px-3 py-1 text-xs font-bold text-white shadow-sm">
              Saber més →
            </span>
          </div>

          {/* Title on image */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-xl md:text-2xl font-extrabold leading-snug text-white line-clamp-2 drop-shadow">
              {project.name}
            </h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
            {project.summary}
          </p>

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
