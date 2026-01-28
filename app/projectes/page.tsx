import ProjectsList from "./ProjectsList"
import { dbUniversityProjectsGetAll } from "@/lib/db/alumni"

export default async function Page() {
  const universityProjects = await dbUniversityProjectsGetAll()

  return (
    <main className="">
      <section className="text-center py-4">
        <h1 className="text-6xl font-bold text-upc">Projectes</h1>
        <p className="py-2 text-base md:text-lg text-slate-600 pt-3">
          Explora projectes desenvolupats a la universitat.
        </p>
      </section>

      <section className="flex flex-col items-start h-[100%] w-[100%] pt-6">
        <ProjectsList universityProjects={universityProjects} />
      </section>
    </main>
  )
}
