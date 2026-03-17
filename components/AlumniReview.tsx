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
        "flex flex-col px-1 pt-2 pb-1",
        "max-w-72 md:max-w-none", // Limit width on mobile so fade effects aren't both visible
      )}
    >
      {/* Comillas decorativas */}
      <Quote aria-hidden className="pointer-events-none absolute -top-2 -left-2 h-24 w-24 text-white/20 select-none" />

      {/* Contenido real */}
      <div className="relative z-10 flex flex-col">
        <div className="relative pt-2 pr-4 pl-7">
          <span className="absolute top-4.5 left-4.5 text-xl leading-0 text-white">"</span>
          <p className="line-clamp-15 text-sm leading-normal font-normal text-white">
            {review}
            <span className="inline-block translate-y-0.5 text-xl leading-0">"</span>
          </p>
        </div>

        <div className="mt-3">
          <AlumniTopPart
            name={firstName}
            surname={lastName}
            generation={generation}
            id={id}
            variant="dark"
            size="small"
            showGeneration={false}
          />
        </div>
      </div>
    </div>
  )
}
