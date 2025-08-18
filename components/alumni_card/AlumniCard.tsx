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
  className?: string
}
export default function AlumniCard({ alumni, className }: Props) {
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
          "rounded-xl bg-upc-muted overflow-hidden shadow-xl shadow-gray-300",
          "flex flex-col",
          "hover:outline-4 outline-[#B0DAED] cursor-pointer h-[24em]",
          "select-none text-left",
          className,
        )}
      >
        {/* Parte superior */}
        <div className="p-8 flex flex-col gap-2 bg-white pb-1 border-b">
          <div className="flex flex-row justify-between items-start gap-4">
            <PersonIcon id={id} className="w-24 h-24" />
            <GenerationBadge year={generation} />
          </div>
          <div className="text-black text-left text-2xl leading-none font-bold mb-2 line-clamp-2">
            {firstName} {lastName}
          </div>
        </div>

        {/* Información adicional */}
        <div className="p-4 pt-2.5 flex flex-col gap-2.5">
          {infoLines.map(([Icon, title, description], index) => (
            <div key={`${alumni.id}-${index}`} className="grid grid-cols-[1em_4.5em_1fr] gap-x-2">
              <Icon />
              <div className="font-bold text-xs text-gray-700">{title}</div>
              <div className="text-xs line-clamp-2 text-gray-600">{description}</div>
            </div>
          ))}
        </div>

        {/* Botón siempre abajo */}
        <div className="mt-auto flex justify-center pb-2">
          <button className="text-center text-sm text-[#4BADD9] hover:underline whitespace-nowrap">Saber més →</button>
        </div>
      </div>
    </FullAlumniDialogTrigger>
  )
}
