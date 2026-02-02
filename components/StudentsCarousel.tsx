"use client"

import { useMemo } from "react"
import AlumniCard from "@/components/alumni_card/AlumniCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AlumniCardInfo, AlumniReviewInfo } from "@/lib/db/alumni"
import { shuffle } from "@/lib/utils"

interface StudentsCarouselProps {
  students: AlumniCardInfo[]
  reviews: AlumniReviewInfo[]
  maxItems?: number
}

export default function StudentsCarousel({ students, reviews, maxItems = 6 }: StudentsCarouselProps) {
  const displayedStudents = useMemo(() => shuffle(students).slice(0, maxItems), [students, maxItems])
  
  const reviewsMap = useMemo(() => {
    const map = new Map<number, AlumniReviewInfo>()
    reviews.forEach((review) => map.set(review.id, review))
    return map
  }, [reviews])

  return (
    <Carousel>
      <CarouselPrevious />
      <CarouselContent>
        {displayedStudents.map((alumni: AlumniCardInfo) => (
          <CarouselItem key={alumni.id} className="basis-auto p-4 pb-10">
            <AlumniCard alumni={alumni} review={reviewsMap.get(alumni.id)} className="border-upc/30 border" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  )
}
