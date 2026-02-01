"use client"

import { useMemo } from "react"
import AlumniCard from "@/components/alumni_card/AlumniCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AlumniCardInfo } from "@/lib/db/alumni"
import { shuffle } from "@/lib/utils"

interface StudentsCarouselProps {
  students: AlumniCardInfo[]
  maxItems?: number
}

export default function StudentsCarousel({ students, maxItems = 6 }: StudentsCarouselProps) {
  const displayedStudents = useMemo(() => shuffle(students).slice(0, maxItems), [students, maxItems])

  return (
    <Carousel>
      <CarouselPrevious />
      <CarouselContent>
        {displayedStudents.map((alumni: AlumniCardInfo) => (
          <CarouselItem key={alumni.id} className="basis-auto p-4 pb-10">
            <AlumniCard alumni={alumni} className="border-upc/30 border" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  )
}
