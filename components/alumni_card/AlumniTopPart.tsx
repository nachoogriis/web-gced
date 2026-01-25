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
    <div className="flex flex-row w-full items-center p-3">
      <div className="w-[75px] h-[75px] flex-shrink-0 rounded-full bg-[#B0DAED]">
        <PersonIcon name={name} surname={surname} />
      </div>

      <div className="flex flex-col justify-center items-start gap-2 p-4">
        <div className="flex flex-row items-center gap-2">
          <p className="text-black text-xl font-bold leading-none">
            {name} {surname}
          </p>
        </div>
        <GenerationBadge year={generation} />
      </div>
    </div>
  )
}
