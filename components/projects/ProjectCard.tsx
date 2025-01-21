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
        <div className="relative flex flex-row items-center w-[100%] bg-white group rounded-[10px] border border-[#B0DAED]">
            <div className="flex flex-row items-center mr-2 rounded-tl-[15px] rounded-bl-[10px]">
                <img src={project.imagePath} alt={project.topic} className="h-[200px] w-auto rounded-tl-[10px] rounded-bl-[10px]" />
                <div className="ml-4">
                    <h2 className="text-xl font-bold">{project.name}</h2>
                    <p className="text-gray-700">{project.description}</p>
                </div>
            </div>
            <div className="absolute inset-0 p-6 bg-white opacity-0 group-hover:opacity-60 flex items-end justify-center rounded-[10px]">
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