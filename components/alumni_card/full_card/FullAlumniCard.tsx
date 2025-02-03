import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlumniCardInfo } from "@/lib/db/alumni";
import AlumniTopPart from "@/components/alumni_card/AlumniTopPart";
import InternshipSection from "./InternshipSection";
import TfgSection from "./TfgSection";
import MasterSection from "./MasterSection";
import CurrentJobSection from "./CurrentJobSection";
import ProjectsSection from "./ProjectsSection";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image"

type Props = {
  alumni: AlumniCardInfo;
};

export default function FullAlumniCard({ alumni }: Props) {
  const {
    firstName,
    lastName,
    generation,
    linkedInURL,
    internships,
    tfgTitle, 
    tfgDescription,
    tfgCountry,
    tfgUniversity,
    masters,
    currentJob,
    projects
   } = alumni
  return (
    <>
      <DialogHeader>
        <VisuallyHidden>
          <DialogTitle>Informació Completa</DialogTitle>
        </VisuallyHidden>

        <div className="flex flex-row items-center justify-center transform scale-[1.3] pr-[20px] pb-[10px]">
          <AlumniTopPart
            name={firstName}
            surname={lastName}
            generation={generation}
          />

          {linkedInURL !== "No especificat" && (
            <button
            className="pt-[20px]"
            onClick={() => window.open(linkedInURL, "_blank")}
          >
            <Image src="linkedin-icon.svg" alt="Open Link" width={40} height={40} />
          </button>
          )}
        </div>
      </DialogHeader>

      <div className="gap-4 overflow-y-auto">
        {/* Prácticas en empresa */}
        {internships.length > 0 && (
          <InternshipSection
            internships={internships}
          />
        )}

        {/* Trabajo de final de grado */}
        <TfgSection 
          tfgTitle={tfgTitle}
          tfgDescription={tfgDescription}
          tfgUniversity={tfgUniversity}
          tfgCountry={tfgCountry}
        />

        {/* Máster */}
        {masters.length > 0 && (
          <MasterSection
            masters={masters}
          />
        )}

        {/* Trabajo actual */}
        {currentJob && (
          <CurrentJobSection
            currentJob={currentJob}
          />
        )}

        {/* Proyectos personales */}
        {projects.length > 0 && (
          <ProjectsSection
            projects={projects}
          />
        )}
      </div>
    </>
  );
}
