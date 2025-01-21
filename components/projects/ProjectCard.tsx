interface ProjectInfo {
    imagePath: string;
    topic: string;
    name: string
    description: string;
}

export default function({
    project
}: {
    project: ProjectInfo
}) {
    return (
        <div className="flex flex-row items-center justify-center w-[100%] bg-blue-100">
            <div className="flex flex-row items-center w-[50%]">
                <img src={project.imagePath} alt={project.topic} className="h-[200px] w-auto" />
                <div className="ml-4 w-[500px]">
                    <h2 className="text-xl font-bold">{project.name}</h2>
                    <p className="text-gray-700">{project.description}</p>
                </div>
            </div>
        </div>
    )
}