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
          "cursor-pointer transition-transform duration-200 ease-out hover:scale-105",
          "h-[26em] md:h-[20em]", // Taller on mobile (more text wrapping), shorter on desktop
          "text-left select-none",
          "w-full max-w-[340px] min-w-[280px]",
          className,
        )}
      >
        {/* Parte superior - fixed height for consistency */}
        <div className="flex h-[160px] shrink-0 flex-col gap-2 border-b bg-white p-6 pb-2">
          <div className="flex flex-row items-start justify-between gap-4">
            <PersonIcon name={firstName} surname={lastName} className="h-20 w-20" />
            <GenerationBadge year={generation} />
          </div>
          {/* Fixed height for name to accommodate 2 lines */}
          <div className="line-clamp-2 h-[2.5em] text-left text-xl leading-tight font-bold text-black">
            {firstName} {lastName}
          </div>
        </div>

        {/* Información adicional - fills remaining space */}
        <div className="flex flex-1 flex-col gap-2 overflow-hidden p-4 pt-3">
          {infoLines.map(([Icon, title, description], index) => (
            <div key={`${alumni.id}-${index}`} className="grid grid-cols-[1em_4.5em_1fr] items-start gap-x-2">
              <Icon />
              <div className="text-xs font-bold text-gray-700">{title}</div>
              <div className="line-clamp-2 text-xs text-gray-600">{description}</div>
            </div>
          ))}
        </div>

        {/* Botón siempre abajo */}
        <div className="flex shrink-0 justify-center pb-3">
          <button className="cursor-pointer text-center text-sm whitespace-nowrap text-[#4BADD9] hover:underline">
            Saber més →
          </button>
        </div>
      </div>
    </FullAlumniDialogTrigger>
  )
}
