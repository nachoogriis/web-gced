import ProjectCard from "./ProjectCard"
import { dbUniversityProjectsGetAll } from "@/lib/db/alumni"

export default async function ProjectsList({ topic }: { topic: string }) {
  const universityProjects = await dbUniversityProjectsGetAll()
  const filteredProjects = universityProjects.filter(
    (project) => project.topic === topic
  )

  return filteredProjects.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-100 rounded py-6 px-6 justify-center items-center">
      {filteredProjects.map((project, index) => (
        <ProjectCard key={index} project={project} />
      ))}
    </div>
  ) : (
    <div className="flex items-center jusitify center">
      No projects have been defined yet for this category
    </div>
  )
}
