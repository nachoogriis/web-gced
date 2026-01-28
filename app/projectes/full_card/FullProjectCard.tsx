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
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center rounded-full bg-upc-muted px-3 py-1 text-xs font-bold text-upc">
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

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight max-w-5xl">
          {project.name}
        </h1>

        {project.summary && (
          <p className="mt-4 max-w-3xl text-base sm:text-lg text-slate-600 leading-relaxed">
            {project.summary}
          </p>
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
        <div className="text-xs font-bold tracking-widest text-upc uppercase mb-3">
          Descripció
        </div>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 whitespace-pre-line">
          {project.description}
        </p>
      </div>
    </section>

    </div>
  )
}
