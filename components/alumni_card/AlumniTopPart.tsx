import PersonIcon from "@/components/icons/PersonIcon";

interface AlumniTopPartProps {
    name: string;
    surname: string;
    generation: number;
}

export default function AlumniTopPart({
    name,
    surname,
    generation
}: AlumniTopPartProps) {
  return (
    <div className="flex items-center gap-[20px] p-[20px] pb-0">
        <PersonIcon />
        <div className="flex flex-col justify-center items-center gap-[9px]">
            <p className="text-black text-[14px] font-bold leading-normal">
                {name}{surname}
            </p>
            <div className="flex p-[5px] justify-center items-center gap-[10px] rounded-[90px] bg-[#B0DAED]">
                <p className="text-black font-poppins text-[12px] font-medium leading-normal">
                    Generació {generation}
                </p>
            </div>
        </div>
    </div>
  );
}
