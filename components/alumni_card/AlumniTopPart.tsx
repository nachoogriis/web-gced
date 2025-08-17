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
    <div className="flex flex-row w-full items-center gap-4 p-3 pb-1">
      <div className="w-[75px] h-[75px] flex-shrink-0 rounded-full bg-[#B0DAED]">
        <PersonIcon id={id} />
      </div>

      <div className="flex flex-col justify-center items-start gap-0">
        <p className="text-black text-2xl font-bold leading-normal">
          {name} {surname}
        </p>
          <GenerationBadge year={generation} />
      </div>
    </div>
  )
}
