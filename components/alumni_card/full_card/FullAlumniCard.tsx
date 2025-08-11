import IconLinkedIn from "@/components/icons/IconLinkedIn"
import PersonIcon from "@/components/icons/PersonIcon"
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlumniCardInfo } from "@/lib/db/alumni"
import { DialogDescription } from "@radix-ui/react-dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import Link from "next/link"
import GenerationBadge from "../GenerationBadge"
import GenericSection from "./GenericSection"

type Props = {
  alumni: AlumniCardInfo
}

export default function FullAlumniCard({ alumni }: Props) {
  const {
    id,
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
    projects,
  } = alumni

  const tfg = { tfgTitle, tfgDescription, tfgCountry, tfgUniversity }

  return (
    <DialogContent className="overflow-y-auto pointer-events-auto max-h-[60em]">
      <DialogHeader>
        <VisuallyHidden>
          <DialogTitle>
            Fitxa completa de {firstName} {lastName}
          </DialogTitle>
        </VisuallyHidden>

        <div className="flex flex-col w-full items-stretch gap-0">
          <PersonIcon id={id} className="w-32 h-32" />

          <div className="flex flex-col justify-center items-stretch leading-none">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-3 items-baseline">
                <p className="text-black text-3xl md:text-5xl font-bold leading-normal">
                  {firstName} {lastName}
                </p>
                {linkedInURL !== "No especificat" && (
                  <div className="flex flex-row">
                    <Link href={linkedInURL} target="_blank" className="text-upc">
                      <IconLinkedIn className="w-8 h-8" />
                    </Link>
                  </div>
                )}
              </div>

              <GenerationBadge year={generation} size="large" />
            </div>
          </div>
        </div>
      </DialogHeader>

      <DialogDescription className="mt-4">
        <GenericSection
          title="Pràctiques a empresa"
          itemLists={internships.map((internship) => [
            { name: "Empresa", text: internship.organization },
            { name: "País", text: internship.country },
            { name: "Tema", text: internship.position },
            { name: "Descripció", text: internship.description },
          ])}
        />
        <GenericSection
          title="Treball Final de Grau"
          itemLists={[
            [
              { name: "Títol", text: tfgTitle },
              { name: "Descripció", text: tfgDescription },
              { name: "Universitat", text: tfgUniversity },
              { name: "País", text: tfgCountry },
            ],
          ]}
        />
        <GenericSection
          title="Màster"
          itemLists={masters.map((master) => [
            { name: "Títol", text: master.name },
            { name: "País", text: master.country },
            { name: "Universitats", text: master.universities },
            { name: "Descripció", text: master.description },
          ])}
        />
        <GenericSection title="Feina Actual" itemLists={[[{ name: "Lloc de Treball", text: currentJob }]]} />
        <GenericSection
          title="Projectes Personals"
          itemLists={projects.map((project) => [
            { name: "Nom", text: project.name },
            { name: "Descripció", text: project.description },
          ])}
        />
      </DialogDescription>
    </DialogContent>
  )
}
