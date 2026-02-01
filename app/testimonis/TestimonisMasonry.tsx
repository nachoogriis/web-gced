"use client"

import { useMemo } from "react"
import AlumniReview from "@/components/AlumniReview"
import { AlumniReviewInfo } from "@/lib/db/alumni"
import { shuffle } from "@/lib/utils"

interface TestimonisMasonryProps {
  reviews: AlumniReviewInfo[]
}

export default function TestimonisMasonry({ reviews }: TestimonisMasonryProps) {
  const shuffledReviews = useMemo(() => shuffle(reviews), [reviews])

  return (
    <div className="mx-auto max-w-6xl columns-1 gap-6 md:columns-2 lg:columns-3">
      {shuffledReviews.map((review: AlumniReviewInfo) => (
        <div key={review.id} className="mb-6 break-inside-avoid">
          <AlumniReview
            firstName={review.firstName}
            lastName={review.lastName}
            generation={review.generation}
            review={review.review}
            id={review.id}
          />
        </div>
      ))}
    </div>
  )
}
