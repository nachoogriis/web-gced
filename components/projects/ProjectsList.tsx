import ProjectCard from "./ProjectCard"
import fakeProjectsData from "./FakeProjectsData"

export default function ProjectsList({
    topic
}: {
    topic: string
}) {
    return (
        <div className="grid grid-cols-2 gap-6 bg-slate-100 rounded py-6 px-6 justify-center items-center">
            {fakeProjectsData
            .filter(project => project.topic === topic)
            .map((project, index) => (<ProjectCard key={index} project={project} />))
            }
        </div>
    )
}