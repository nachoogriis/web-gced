import PageHeading from "@/components/PageHeading"
import ProjectsList from "./ProjectsList"
import { dbUniversityProjectsGetAll } from "@/lib/db/alumni"

export default async function Page() {
  const universityProjects = await dbUniversityProjectsGetAll()

  return (
    <main className="">
      <PageHeading
        title="Projectes"
        subtitle="Explora projectes desenvolupats a la universitat."
      />

      <section className="flex flex-col items-start h-[100%] w-[100%]">
        <ProjectsList universityProjects={universityProjects} />
      </section>
    </main>
  )
}
