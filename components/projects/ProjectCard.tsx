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
        <div className="relative flex flex-row items-center w-[100%] bg-white group rounded-[10px] border border-[#B0DAED] gap-4">
            <img src={project.imagePath} alt={project.topic} className="h-[200px] w-auto rounded-tl-[10px] rounded-bl-[10px]" />
            <div className="flex flex-col items-center justify-center gap-5 mr-4">
                <div className="text-center">
                    <h2 className="text-xl font-bold">{project.name}</h2>
                    <p className="text-gray-700">{project.description}</p>
                </div>
                <GcedButton width = "200px">
                    <div className="flex flex-row items-center justify-center gap-2">
                    <InfoIcon />
                    <h1>Més informació</h1>
                    </div>
                </GcedButton>
            </div>
        </div>
    )
}