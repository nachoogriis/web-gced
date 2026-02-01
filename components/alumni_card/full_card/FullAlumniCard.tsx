import IconLinkedIn from "@/components/icons/IconLinkedIn"
import PersonIcon from "@/components/icons/PersonIcon"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AlumniCardInfo } from "@/lib/db/alumni"
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
    <DialogContent className="pointer-events-auto max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[720px] overflow-y-auto select-none">
      <DialogHeader>
        <VisuallyHidden>
          <DialogTitle>
            Fitxa completa de {firstName} {lastName}
          </DialogTitle>
        </VisuallyHidden>

        <div className="flex w-full flex-col items-stretch gap-0">
          <PersonIcon name={firstName} surname={lastName} className="h-32 w-32" />

          <div className="flex flex-col items-stretch justify-center leading-none">
            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-baseline gap-3">
                <p className="text-3xl leading-normal font-bold text-black md:text-5xl">
                  {firstName} {lastName}
                </p>
                {linkedInURL !== "No especificat" && (
                  <div className="flex flex-row">
                    <Link href={linkedInURL} target="_blank" className="text-upc">
                      <IconLinkedIn className="h-8 w-8" />
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
          itemLists={internships.map((internship: AlumniCardInfo["internships"][number]) => [
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
          itemLists={masters.map((master: AlumniCardInfo["masters"][number]) => [
            { name: "Títol", text: master.name },
            { name: "País", text: master.country },
            { name: "Universitats", text: master.universities },
            { name: "Descripció", text: master.description },
          ])}
        />
        <GenericSection
          title="Feina Actual"
          itemLists={[
            [
              { name: "Empresa", text: alumni.currentOrganization },
              { name: "Posició", text: alumni.currentPosition },
              { name: "Descripció", text: alumni.currentJobDescription },
            ],
          ]}
        />

        <GenericSection
          title="Projectes Personals"
          itemLists={projects.map((project: AlumniCardInfo["projects"][number]) => [
            { name: "Nom", text: project.name },
            { name: "Descripció", text: project.description },
          ])}
        />
      </DialogDescription>
    </DialogContent>
  )
}
