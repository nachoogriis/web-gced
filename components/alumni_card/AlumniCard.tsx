"use client"

import InternshipIcon from "@/components/icons/InternshipIcon"
import MasterIcon from "@/components/icons/MasterIcon"
import TfgIcon from "@/components/icons/TfgIcon"
import { AlumniCardInfo } from "@/lib/db/alumni"
import { cn } from "@/lib/utils"
import CurrentJobIcon from "../icons/CurrentJobIcon"
import PersonIcon from "../icons/PersonIcon"
import FullAlumniDialogTrigger from "./full_card/FullAlumniDialogTrigger"
import GenerationBadge from "./GenerationBadge"

type Props = {
  alumni: AlumniCardInfo
}
export default function AlumniCard({ alumni }: Props) {
  const { id, firstName, lastName, generation, internships, tfgTitle, masters, currentJob } = alumni

  const infoLines: [React.FC, string, string][] = [
    [InternshipIcon, "Pràctiques", internships[0].description],
    [TfgIcon, "TFG", tfgTitle],
    [MasterIcon, "Màster", masters[0].name],
    [CurrentJobIcon, "Actualment", currentJob],
  ]

  return (
    <FullAlumniDialogTrigger alumni={alumni}>
      <div
        className={cn(
          "rounded-xl bg-white overflow-hidden h-[24em] shadow-xl shadow-gray-300",
          "flex flex-col items-stretch gap-[0.4em]",
          "hover:outline-4 outline-[#B0DAED] cursor-pointer",
        )}
      >
        {/* Parte superior con el nombre y generación */}
        <div className="p-8 pb-0 flex flex-col gap-2">
          <div className="flex flex-row justify-between items-start gap-4">
            <PersonIcon id={id} className="w-24 h-24" />
            <GenerationBadge year={generation} />
          </div>

          <div className="text-black text-2xl leading-none font-bold mb-2 line-clamp-2">
            {firstName} {lastName}
          </div>
        </div>

        {/* Información adicional */}
        <div className="grid grid-cols-[1em_4.5em_1fr] gap-x-2 justify-center items-start overflow-y-auto p-4 border-t bg-upc-muted flex-1">
          {infoLines.map(([Icon, title, description]) => (
            <>
              <Icon />
              <div className="font-bold text-xs text-gray-700">{title}</div>
              <div className="text-xs line-clamp-2 text-gray-600">{description}</div>
            </>
          ))}
        </div>
      </div>
    </FullAlumniDialogTrigger>
  )
}
