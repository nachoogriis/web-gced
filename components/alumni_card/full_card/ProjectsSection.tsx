interface ProjectType {
  name: string
  description: string
}

type Props = {
  projects: ProjectType[]
}

const ProjectsSection: React.FC<Props> = ({ projects }) => {
  return (
    <section>
      <h2 className="text-m text-[#007BC0] font-bold border-b pb-1 mt-6 mb-2">
        Projectes Personals
      </h2>
      {projects.map((project, index) => (
        <div key={index} className="mb-4">
          <p className="text-sm">
            <span className="font-bold">Nom:</span> {project.name}
          </p>
          <p className="text-sm">
            <span className="font-bold">Descripció:</span> {project.description}
          </p>
        </div>
      ))}
    </section>
  )
}

export default ProjectsSection
