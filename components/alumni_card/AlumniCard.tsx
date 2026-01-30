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
  [InternshipIcon, "Pràctiques", internships?.[0]?.organization ?? "No especificat"],
  [TfgIcon, "TFG", tfgTitle ?? "No especificat"],
  [MasterIcon, "Màster", masters?.[0]?.name ?? "No especificat"],
  [CurrentJobIcon, "Actualment", currentJob ?? "No especificat"],
]


  return (
    <FullAlumniDialogTrigger alumni={alumni}>
      <div
        className={cn(
          "bg-upc-muted overflow-hidden",
          "flex flex-col",
          "transition-transform duration-200 ease-out hover:scale-105 cursor-pointer",
          "h-[26em] md:h-[20em]", // Taller on mobile (more text wrapping), shorter on desktop
          "select-none text-left",
          "w-full min-w-[280px] max-w-[340px]",
          className,
        )}
      >
        {/* Parte superior - fixed height for consistency */}
        <div className="p-6 pb-2 flex flex-col gap-2 bg-white border-b h-[160px] shrink-0">
          <div className="flex flex-row justify-between items-start gap-4">
            <PersonIcon name={firstName} surname={lastName} className="w-20 h-20" />
            <GenerationBadge year={generation} />
          </div>
          {/* Fixed height for name to accommodate 2 lines */}
          <div className="text-black text-left text-xl leading-tight font-bold line-clamp-2 h-[2.5em]">
            {firstName} {lastName}
          </div>
        </div>

        {/* Información adicional - fills remaining space */}
        <div className="p-4 pt-3 flex flex-col gap-2 flex-1 overflow-hidden">
          {infoLines.map(([Icon, title, description], index) => (
            <div key={`${alumni.id}-${index}`} className="grid grid-cols-[1em_4.5em_1fr] gap-x-2 items-start">
              <Icon />
              <div className="font-bold text-xs text-gray-700">{title}</div>
              <div className="text-xs line-clamp-2 text-gray-600">{description}</div>
            </div>
          ))}
        </div>

        {/* Botón siempre abajo */}
        <div className="flex justify-center pb-3 shrink-0">
          <button className="text-center text-sm text-[#4BADD9] hover:underline whitespace-nowrap cursor-pointer">Saber més →</button>
        </div>
      </div>
    </FullAlumniDialogTrigger>
  )
}
