import ProjectTitle from "./ProjectTitle";

interface ProjectInfo {
  imagePath: string;
  topic: string;
  name: string
  description: string;
}

export default function FullProjectCard({
  project
}: {
  project: ProjectInfo
}) {
  return (
    <div className="flex items-center justify-center max-h-none">
      <div className="flex flex-row gap-10 items-center justify center w-[95%] h-[95%]">
        <div className="flex flex-col w-[50%] h-[100%]">
          <ProjectTitle title = {project.name}/>
          <div className="flex items-center justify-center h-[80%]">
            <img src={project.imagePath} alt={project.topic} className="h-auto" />
          </div>
        </div>
        <div className="border-2 border-red-700 w-[50%] h-[100%]">
          
        </div>
      </div>
    </div>
  );
}
