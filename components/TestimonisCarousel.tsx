"use client"

import { useMemo } from "react"
import AlumniReview from "@/components/AlumniReview"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AlumniReviewInfo } from "@/lib/db/alumni"
import { cn, shuffle } from "@/lib/utils"

interface TestimonisCarouselProps {
  reviews: AlumniReviewInfo[]
  maxItems?: number
}

export default function TestimonisCarousel({ reviews, maxItems = 6 }: TestimonisCarouselProps) {
  const displayedReviews = useMemo(() => shuffle(reviews).slice(0, maxItems), [reviews, maxItems])

  return (
    <Carousel>
      <CarouselPrevious
        className={cn(
          "absolute top-1/2 left-2 z-10 -translate-y-1/2",
          "bg-upc hover:bg-upc/90 text-white hover:text-white/90",
        )}
      />
      <CarouselContent>
        {displayedReviews.map(({ firstName, lastName, generation, review, id }: AlumniReviewInfo) => (
          <CarouselItem
            key={id}
            className={cn(
              "md:basis-1/2 lg:basis-1/3 xl:basis-1/3",
              "p-4 min-[1920px]:basis-1/6 min-[2320px]:basis-1/7",
            )}
          >
            <AlumniReview
              firstName={firstName}
              lastName={lastName}
              generation={generation}
              review={review}
              id={id}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext
        className={cn(
          "bg-upc absolute top-1/2 right-2 z-10 -translate-y-1/2 text-white",
          "bg-upc hover:bg-upc/90 text-white hover:text-white/90",
        )}
      />
    </Carousel>
  )
}
