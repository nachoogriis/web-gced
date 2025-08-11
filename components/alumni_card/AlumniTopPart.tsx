import PersonIcon from "@/components/icons/PersonIcon"

interface AlumniTopPartProps {
  name: string
  surname: string
  generation: number
  id?: number
}

export default function AlumniTopPart({ name, surname, generation, id = 0 }: AlumniTopPartProps) {
  return (
    <div className="flex items-center gap-[20px] p-[20px] pb-0">
      <div
        className="flex justify-center items-center flex-shrink-0 rounded-[90px] bg-[#B0DAED]"
        style={{ width: `75px`, height: `75px` }}
      >
        <PersonIcon id={id} />
      </div>

      <div className="flex flex-col justify-center items-center gap-[9px]">
        <p className="text-black text-[14px] font-bold leading-normal">
          {name} {surname}
        </p>
        <div className="flex p-[5px] justify-center items-center gap-[10px] rounded-[90px] bg-[#B0DAED]">
          <p className="px-2 text-black font-poppins text-[12px] font-medium leading-normal">Generació {generation}</p>
        </div>
      </div>
    </div>
  )
}
