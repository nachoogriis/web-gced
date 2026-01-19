import PersonIcon from "@/components/icons/PersonIcon"

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
        <p className="text-black text-xl font-bold leading-none">
          {name} {surname}
        </p>
        <div className="flex p-0.5 mt-1.5 justify-center items-center rounded-full bg-[#B0DAED]">
          <p className="px-2 text-black font-poppins text-[12px] font-medium leading-normal">{generation}</p>
        </div>
      </div>
    </div>
  )
}
