import PersonIcon from "@/components/icons/PersonIcon"
import GenerationBadge from "./GenerationBadge"

interface AlumniTopPartProps {
  name: string
  surname: string
  generation: number
  id?: number
}

export default function AlumniTopPart({ name, surname, generation, id = 0 }: AlumniTopPartProps) {
  return (
    <div className="flex w-full flex-row items-center p-3">
      <div className="h-[75px] w-[75px] flex-shrink-0 rounded-full bg-[#B0DAED]">
        <PersonIcon name={name} surname={surname} />
      </div>

      <div className="flex flex-col items-start justify-center gap-2 p-4">
        <div className="flex flex-row items-center gap-2">
          <p className="text-xl leading-none font-bold text-black">
            {name} {surname}
          </p>
        </div>
        <GenerationBadge year={generation} />
      </div>
    </div>
  )
}
