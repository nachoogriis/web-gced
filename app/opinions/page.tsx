import AlumniReview from "@/components/AlumniReview"
import PageHeading from "@/components/PageHeading"
import { AlumniReviewInfo, dbAlumniGetAllReviews } from "@/lib/db/alumni"

export default async function OpinionsPage() {
  const alumniReviews = await dbAlumniGetAllReviews()

  return (
    <main className="flex w-full flex-col items-stretch">
      <PageHeading title="Opinions" subtitle="Què diuen els nostres estudiants sobre el grau." />

      <section className="border-t bg-gray-100 px-4 pb-20 pt-8 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl columns-1 gap-6 md:columns-2 lg:columns-3">
          {alumniReviews.map((review: AlumniReviewInfo) => (
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
      </section>
    </main>
  )
}
