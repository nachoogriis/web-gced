import AlumniTopPart from "@/components/alumni_card/AlumniTopPart";

interface AlumniReviewProps {
  firstName: string;
  lastName: string;
  generation: number;
  review: string;
}

export default function AlumniReview({
  firstName,
  lastName,
  generation,
  review,
}: AlumniReviewProps) {
  return (
    <div className="border border-[#B0DAED] bg-white overflow-hidden w-[590px] h-[228px] flex-shrink-0 flex flex-col rounded-tl-[15px] rounded-tr-[15px] rounded-br-[15px]">
      <div className="flex items-start scale-55">
        <AlumniTopPart name={firstName} surname={lastName} generation={generation} />
      </div>

      <div className="flex mt-4 gap-[15px] px-8">
        <p className="text-[12px] text-black font-normal leading-normal">
          {review}
        </p>
      </div>
    </div>
  );
}
