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

export default function AlumniReview({ firstName, lastName, generation, review, id }: AlumniReviewProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden select-none",
        "bg-upc",
        "flex flex-col pt-2 px-1 pb-1",
        "max-w-72 md:max-w-none", // Limit width on mobile so fade effects aren't both visible
      )}
    >
      {/* Comillas decorativas */}
      <Quote
        aria-hidden
        className="text-white/20 pointer-events-none absolute -top-2 -left-2 h-24 w-24 select-none"
      />

      {/* Contenido real */}
      <div className="relative z-10 flex flex-col">
        <div className="relative pl-7 pr-4 pt-2">
          <span className="absolute left-4.5 top-4.5 text-xl leading-0 text-white">"</span>
          <p className="line-clamp-15 text-sm leading-normal font-normal text-white">
            {review}
            <span className="inline-block text-xl leading-0 translate-y-0.5">"</span>
          </p>
        </div>

        <div className="mt-3">
          <AlumniTopPart name={firstName} surname={lastName} generation={generation} id={id} variant="dark" size="small" showGeneration={false} />
        </div>
      </div>
    </div>
  )
}
