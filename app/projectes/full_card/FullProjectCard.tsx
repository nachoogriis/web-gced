"use client"

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

function splitTags(tags?: string) {
  if (!tags) return []
  return (
    tags
      .match(/\[([^\]]+)\]/g)
      ?.map((t) => t.slice(1, -1).trim())
      .filter(Boolean)
      .slice(0, 8) ?? []
  )
}

export default function FullProjectCard({ project }: { project: ProjectInfo }) {
  const tags = splitTags(project.tags)

  return (
    <div className="w-full">
      {/* Header */}
      <header className="px-6 pt-8 pb-8 sm:px-10">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="bg-upc-muted text-upc inline-flex items-center rounded-full px-3 py-1 text-xs font-bold">
            {project.topic}
          </span>

          {/* Tags (misma opción que cards pequeñas) */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {tags.map((t, i) => (
                <span
                  key={`${t}-${i}`}
                  className="rounded-full border border-slate-300 px-2.5 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <h1 className="max-w-5xl text-3xl leading-tight font-extrabold text-slate-900 sm:text-4xl md:text-5xl">
          {project.name}
        </h1>

        {project.summary && (
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">{project.summary}</p>
        )}
      </header>

      {/* Hero gallery */}
      <section className="px-6 sm:px-10">
        <div className="rounded-3xl bg-slate-50 p-4 sm:p-6">
          <ImageGallery projectImages={project.images} />
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-10 sm:px-10">
        <div className="max-w-5xl">
          <div className="text-upc mb-3 text-xs font-bold tracking-widest uppercase">Descripció</div>
          <p className="text-sm leading-relaxed whitespace-pre-line text-slate-700 sm:text-base">
            {project.description}
          </p>
        </div>
      </section>
    </div>
  )
}
