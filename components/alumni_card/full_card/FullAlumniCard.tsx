import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlumniCardInfo } from "@/lib/db/alumni";
import AlumniTopPart from "@/components/alumni_card/AlumniTopPart";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

type Props = {
  alumni: AlumniCardInfo;
};

export default function FullAlumniCard({ alumni }: Props) {
  return (
    <>
      <DialogHeader>
        <VisuallyHidden>
          <DialogTitle>Informació Completa</DialogTitle>
        </VisuallyHidden>

        <div className="transform scale-[1.3] origin-left">
          <AlumniTopPart
            name={alumni.firstName}
            surname={alumni.lastName}
            generation={alumni.generation}
          />
        </div>
      </DialogHeader>

      <div className="gap-4 overflow-y-auto">
        {/* Enlace de LinkedIn */}
        {alumni.linkedInURL && (
          <section>
            <h2 className="text-m font-semibold border-b pt-4 mt-6 mb-2">
              Perfil de LinkedIn
            </h2>
            <p className="text-sm pb-4">
            <span className="font-bold">Enllaç:</span> <a
                href={alumni.linkedInURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {alumni.linkedInURL}
              </a>
            </p>
          </section>
        )}
        
        {/* Prácticas en empresa */}
        {alumni.internships.length > 0 && (
          <section>
            <h2 className="text-m font-semibold border-b pb-2 mt-6 mb-2">
              Pràctiques a empresa
            </h2>
            {alumni.internships.map((internship, index) => (
              <div key={index} className="mb-4">
                <p className="text-sm">
                  <span className="font-bold">Empresa:</span> {internship.organization}
                </p>
                <p className="text-sm">
                  <span className="font-bold">País:</span> {internship.country}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Tema:</span> {internship.position}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Descripció:</span> {internship.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Trabajo de final de grado */}
        <section>
          <h2 className="text-m font-semibold border-b pb-2 mt-6 mb-2">
            Treball de final de grau
          </h2>
          <div className="mb-4">
            <p className="text-sm">
              <span className="font-bold">Títol:</span> {alumni.tfgTitle || "No especificado"}
            </p>
            <p className="text-sm">
              <span className="font-bold">Descripció:</span> {alumni.tfgDescription || "No especificado"}
            </p>
            <p className="text-sm">
              <span className="font-bold">Universitat:</span> {alumni.tfgUniversity || "No especificado"}
            </p>
            <p className="text-sm">
              <span className="font-bold">País:</span> {alumni.tfgCountry || "No especificado"}
            </p>
          </div>
        </section>

        {/* Máster */}
        {alumni.masters.length > 0 && (
          <section>
            <h2 className="text-m font-semibold border-b pb-2 mt-6 mb-2">
              Màster
            </h2>
            {alumni.masters.map((master, index) => (
              <div key={index} className="mb-4">
                <p className="text-sm">
                  <span className="font-bold">Títol del màster:</span> {master.name}
                </p>
                <p className="text-sm">
                  <span className="font-bold">País:</span> {master.country}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Universitats:</span> {master.universities}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Descripció:</span> {master.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Trabajo actual */}
        {alumni.currentJob && (
          <section>
            <h2 className="text-m font-semibold border-b pb-2 mt-6 mb-2">
              Feina Actual
            </h2>
            <div className="mb-4">
              <p className="text-sm">
                <span className="font-bold">Lloc de treball:</span> {alumni.currentJob}
              </p>
            </div>
          </section>
        )}

        {/* Proyectos personales */}
        {alumni.projects.length > 0 && (
          <section>
            <h2 className="text-m font-semibold border-b pb-2 mt-6 mb-2">
              Projectes Personals
            </h2>
            {alumni.projects.map((project, index) => (
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
        )}
      </div>
    </>
  );
}
