import AlumniTopPart from "@/components/alumni_card/AlumniTopPart"

interface AlumniReviewProps {
  firstName: string
  lastName: string
  generation: number
  review: string | null
  id: number
}

export default function AlumniReview({ firstName, lastName, generation, review, id }: AlumniReviewProps) {
  return (
    <div className="border border-[#B0DAED] bg-white overflow-hidden h-[230px] flex flex-col rounded-[10px] shadow-md">
      <div className="flex items-start">
        <AlumniTopPart name={firstName} surname={lastName} generation={generation} id={id} />
      </div>

      <div className="flex mt-4 gap-[15px] px-3 ">
        <p className="text-[12px] text-gray-600 font-normal leading-normal line-clamp-6">{review}</p>
      </div>
    </div>
  )
}
