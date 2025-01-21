import GcedButton from "../GcedButton";
import { InfoIcon } from "../icons/InfoIcon";

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
        <div className="relative flex flex-row items-center justify-center w-[100%] bg-blue-100 group">
            <div className="flex flex-row items-center w-[50%]">
                <img src={project.imagePath} alt={project.topic} className="h-[200px] w-auto" />
                <div className="ml-4 w-[500px]">
                    <h2 className="text-xl font-bold">{project.name}</h2>
                    <p className="text-gray-700">{project.description}</p>
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent opacity-0 group-hover:opacity-90 transition-opacity flex items-center justify-center">
                <GcedButton>
                    <div className="flex flex-row items-center justify-center gap-2">
                        <InfoIcon />
                        <h1>Més informació</h1>
                    </div>
                </GcedButton>
            </div>
        </div>
    )
}