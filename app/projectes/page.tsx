import ProjectsList from "./ProjectsList"
import { dbUniversityProjectsGetAll } from "@/lib/db/alumni"

export default async function Page() {
  const universityProjects = await dbUniversityProjectsGetAll()

  return (
    <main className="p-4">
      <h1 className="text-6xl font-bold mb-4 text-center text-[#007BC0]">Projectes</h1>

      <section className="flex flex-col items-start h-[100%] w-[100%]">
        <ProjectsList universityProjects={universityProjects} />
      </section>
    </main>
  )
}
