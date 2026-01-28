import AlumniTopPart from "@/components/alumni_card/AlumniTopPart"
import { cn } from "@/lib/utils"
import { Quote } from "lucide-react"



interface AlumniReviewProps {
  firstName: string
  lastName: string
  generation: number
  review: string | null
  id: number
}

export default function AlumniReview({
  firstName,
  lastName,
  generation,
  review,
  id,
}: AlumniReviewProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "rounded-tl-[15px] rounded-tr-[15px] rounded-br-[15px]",
        "bg-upc-muted h-[235px]",
        "shadow-xl shadow-gray-300",
        "flex flex-col gap-[0.1em] pt-2",
      )}
    >
      {/* Comillas decorativas */}
      <Quote
        aria-hidden
        className="
          absolute -top-4 -right-3
          h-24 w-24
          text-upc
          rotate-180
          pointer-events-none
          select-none
        "
      />


      {/* Contenido real */}
      <div className="relative z-10">
        <div className="flex items-start">
          <AlumniTopPart
            name={firstName}
            surname={lastName}
            generation={generation}
            id={id}
          />
        </div>

        <div className="px-3">
          <p className="text-[12px] text-gray-700 font-normal leading-normal line-clamp-6">
            {review}
          </p>
        </div>
      </div>
    </div>
  )
}

