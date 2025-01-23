"use client";

import ProjectTitle from "./ProjectTitle";
import ImageGallery from "./ImageGallery";

interface ProjectInfo {
  imagePath: string;
  topic: string;
  name: string;
  description: string;
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
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
              de las industrias desde el año 1500, cuando un impresor (N. del T.
              persona que se dedica a la imprenta) desconocido usó una galería de
              textos y los mezcló de tal manera que logró hacer un libro de textos
              especimen. No sólo sobrevivió 500 años, sino que tambien ingresó
              como texto de relleno en documentos electrónicos, quedando
              esencialmente igual al original.
            </p>

            <p className="text-lg text-center">
              Lorem Ipsum es simplemente el texto de relleno de las imprentas y
              archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar
              de las industrias desde el año 1500, cuando un impresor (N. del T.
              persona que se dedica a la imprenta) desconocido usó una galería de
              textos y los mezcló de tal manera que logró hacer un libro de textos
              especimen. No sólo sobrevivió 500 años, sino que tambien ingresó
              como texto de relleno en documentos electrónicos, quedando
              esencialmente igual al original.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
