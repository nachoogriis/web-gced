import ProjectCard from "./ProjectCard"
import fakeProjectsData from "./FakeProjectsData"

export default function ProjectsList({
    topic
}: {
    topic: string
}) {
    return (
        <div className="flex flex-col items-center justify-center h-[100%] bg-slate-100 rounded py-6 gap-6">
            {fakeProjectsData
                .filter(project => project.topic === topic)
                .map((project, index) => (<ProjectCard key={index} project={project} />))
            }
        </div>
    )
}