import ProjectCard from "@/app/projectes/ProjectCard"
import { dbUniversityProjectsGetAll, UniversityProjectInfo } from "@/lib/db/alumni"

export default async function ProjectsList({ topic }: { topic: string }) {
  const universityProjects = await dbUniversityProjectsGetAll()
  const filteredProjects = universityProjects.filter((project: UniversityProjectInfo) => project.topic === topic)

  return filteredProjects.length > 0 ? (
    <div className="grid grid-cols-1 items-center justify-center gap-6 rounded bg-gray-100 px-6 py-6 md:grid-cols-1 lg:grid-cols-2">
      {filteredProjects.map((project: UniversityProjectInfo, index: number) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  ) : (
    <div className="jusitify center flex items-center">No projects have been defined yet for this category</div>
  )
}
