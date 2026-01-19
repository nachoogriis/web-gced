import AlumniTopPart from "@/components/alumni_card/AlumniTopPart"
import { cn } from "@/lib/utils"


interface AlumniReviewProps {
  firstName: string
  lastName: string
  generation: number
  review: string | null
  id: number
}

export default function AlumniReview({ firstName, lastName, generation, review, id }: AlumniReviewProps) {
  return (
    <div className={cn(
    "rounded-tl-[15px] rounded-tr-[15px] rounded-br-[15px] bg-upc-muted overflow-hidden h-[230px] shadow-xl shadow-gray-300",
    "flex flex-col items-stretch gap-[0.4em]",
      )}>
      <div className="flex items-start">
        <AlumniTopPart name={firstName} surname={lastName} generation={generation} id={id} />
      </div>

      <div className="flex mt-4 gap-[15px] px-3 ">
        <p className="text-[12px] text-gray-600 font-normal leading-normal line-clamp-6">{review}</p>
      </div>
    </div>
  )
}
