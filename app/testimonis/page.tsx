import PageHeading from "@/components/PageHeading"
import { dbAlumniGetAllReviews } from "@/lib/db/alumni"
import TestimonisMasonry from "./TestimonisMasonry"

export default async function TestimonisPage() {
  const alumniReviews = await dbAlumniGetAllReviews()

  return (
    <main className="flex w-full flex-col items-stretch">
      <PageHeading title="Testimonis" subtitle="Què diuen els nostres graduats sobre el grau." />

      <section className="border-t bg-gray-100 px-4 pb-20 pt-8 md:px-8 lg:px-12">
        <TestimonisMasonry reviews={alumniReviews} />
      </section>
    </main>
  )
}
