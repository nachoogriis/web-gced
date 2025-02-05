"use client";

import ProjectTitle from "./ProjectTitle";
import ImageGallery from "./ImageGallery";

interface ProjectInfo {
  id: number,
  name: string,
  summary: string,
  description: string,
  topic: string,
  tags: string
}

export default function FullProjectCard({ project }: { project: ProjectInfo }) {
  return (
    <div className="flex items-center justify-center max-h-none">
      <div className="flex flex-col gap-10 w-[95%] h-[95%]">
        <ProjectTitle title={project.name} />
        <div className="flex flex-row gap-10 items-center justify-center">
          <ImageGallery />
          <div className="w-[45%] flex flex-col items-center justify-center gap-5">
            <p className="text-lg text-center">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
