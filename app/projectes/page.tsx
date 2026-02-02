import PageHeading from "@/components/PageHeading"
import ProjectsList from "./ProjectsList"
import { dbUniversityProjectsGetAll } from "@/lib/db/alumni"

export default async function Page() {
  const universityProjects = await dbUniversityProjectsGetAll()

  return (
    <main>
      <PageHeading title="Projectes" subtitle="Explora alguns dels projectes desenvolupats a la universitat." />

      <section className="flex h-full w-full flex-col items-start">
        <ProjectsList universityProjects={universityProjects} />
      </section>
    </main>
  )
}
