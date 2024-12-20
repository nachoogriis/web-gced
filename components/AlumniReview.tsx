import AlumniTopPart from "@/components/alumni_card/AlumniTopPart";

interface AlumniCardProps {
    name: string;
    surname: string;
    generation: number;
    description: string;
  }
  
  export default function AlumniReview({
    name,
    surname,
    generation,
    description,
  }: AlumniCardProps) {
    return (
      <div className="border border-[#B0DAED] bg-white overflow-hidden w-[590px] h-[228px] flex-shrink-0 flex flex-col rounded-tl-[15px] rounded-tr-[15px] rounded-br-[15px]">
        
        <div className="flex items-start scale-55">
          <AlumniTopPart name={name} surname={surname} generation={generation}/>
        </div>
  
        <div className="flex mt-4 gap-[15px] px-8">
          <p className="text-[12px] text-black font-normal leading-normal">
            {description}
          </p>
        </div>
      </div>
    );
  }
  