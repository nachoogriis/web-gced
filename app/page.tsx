import AlumniCard from "@/components/alumni_card/AlumniCard"
import AlumniReview from "@/components/AlumniReview"
import BannerMainStats from "@/components/BannerMainStats"
import ButtonGoStudents from "@/components/ButtonGoStudents"
import CompanyCard from "@/components/CompanyCard"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { dbAlumniGetAllCardsInfo, dbAlumniGetAllReviews } from "@/lib/db/alumni"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default async function Home() {
  const alumniData = await dbAlumniGetAllCardsInfo()
  const alumniReviews = await dbAlumniGetAllReviews()

  return (
    <main>
      <section className="text-center py-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-upc mx-5">
          Grau en Ciència i Enginyeria de Dades
        </h1>
        <p className="py-2 text-sm md:text-base lg:text-lg text-upc mx-5">Quin és el teu somni?</p>
      </section>

      <BannerMainStats />

      <section className="text-sm md:text-base lg:text-lg text-center font-semibold py-10">
        <CompanyCard />
        <Link href="/estadistiques" className="text-l text-[#585b5d] hover:underline">
          {" "}
          Veure més estadístiques...
        </Link>
      </section>

      <section className="text-sm md:text-base lg:text-lg flex flex-col items-center pb-10">
        <h2 className="text-base md:text-lg lg:text-xl font-semibold mb-4">Coneix més sobre el nostre programa</h2>
        <div className="w-full max-w-3xl aspect-video">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/54Yeq8OoKS8"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <section className="text-sm md:text-base lg:text-lg flex flex-col gap-4 overflow-clip py-4 text-center mx-3">
        <h2 className="text-3xl font-semibold">Coneix als nostres estudiants</h2>

        <div className="relative">
          <Carousel>
            <CarouselPrevious
              className={cn(
                "absolute left-2 top-1/2 z-10 -translate-y-1/2",
                "bg-upc text-white hover:bg-upc/90 hover:text-white/90",
              )}
            />
            <CarouselContent>
              {alumniData.map((alumni, index) => (
                <CarouselItem key={index} className="sm:basis-1 md:basis-1/2 lg:basis-1/3 p-4 pb-12">
                  <AlumniCard alumni={alumni} className="border border-upc/10" />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext
              className={cn(
                "absolute right-2 top-1/2 z-10 -translate-y-1/2 bg-upc text-white",
                "bg-upc text-white hover:bg-upc/90 hover:text-white/90",
              )}
            />
          </Carousel>
        </div>

        <div className="flex flex-row justify-center">
          <ButtonGoStudents />
        </div>
      </section>

      <section className="text-sm md:text-base lg:text-lg py-10 bg-gray-100">
        <div className="mx-3">
          <div className="py-4">
            <h2 className="text-3xl text-center font-semibold mb-6">Opinions dels nostres estudiants</h2>
            <Carousel>
              <CarouselPrevious className="absolute left-2 top-1/2 z-10 -translate-y-1/2" />
              <CarouselContent>
                {alumniReviews.map((review, index) => (
                  <CarouselItem
                    key={index}
                    className={cn(
                      "md:basis-1/2 lg:basis-1/5 xl:basis-1/4 2xl:basis-1/5",
                      "min-[1920px]:basis-1/6 min-[2320px]:basis-1/7",
                    )}
                  >
                    <AlumniReview
                      firstName={review.firstName}
                      lastName={review.lastName}
                      generation={review.generation}
                      review={review.review}
                      id={review.id}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext className="absolute right-2 top-1/2 z-10 -translate-y-1/2" />
            </Carousel>
            <div className="flex flex-row gap-10 justify-center"></div>
          </div>
        </div>
      </section>
      <section className="h-20"></section>
    </main>
  )
}
