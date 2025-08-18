import ProjectsList from "./ProjectsList"
import { dbUniversityProjectsGetAll } from "@/lib/db/alumni"

export default async function Page() {
  const universityProjects = await dbUniversityProjectsGetAll()

  return (
    <main>
      <h1 className="title">Projectes</h1>

      <section className="flex flex-col items-start h-[100%] w-[100%]">
        <ProjectsList universityProjects={universityProjects} />
      </section>
    </main>
  )
}
