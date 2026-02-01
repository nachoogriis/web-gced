import AlumniCard from "@/components/alumni_card/AlumniCard"
import AlumniReview from "@/components/AlumniReview"
import BannerMainStats from "@/components/BannerMainStats"
import ButtonGo from "@/components/ButtonGoStudents"
import CompanyLogos from "@/components/ComopanyLogos"
import HomeSlideshow from "@/components/HomeSlideshow"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { AlumniReviewInfo, dbAlumniGetAllCardsInfo, dbAlumniGetAllReviews } from "@/lib/db/alumni"
import { getHomeImages } from "@/lib/getHomeImages"
import { cn } from "@/lib/utils"

export default async function Home() {
  const alumniData = await dbAlumniGetAllCardsInfo()
  const alumniReviews = await dbAlumniGetAllReviews()
  const images = getHomeImages()

  return (
    <main>
      <section className="relative overflow-hidden py-16 text-center lg:px-50 lg:py-48">
        <HomeSlideshow images={images} />

        <h1 className="text-upc m-0 px-4 text-6xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          Grau en Ciència i Enginyeria de Dades
        </h1>

        <p className="text-upc mx-5 mt-4 text-base md:text-lg lg:text-3xl">Quin és el teu somni?</p>
      </section>

      <BannerMainStats />



      <div className="mx-auto lg:w-6xl">

        <section className="pb-10 text-sm md:text-base lg:text-lg mt-12">
          {/* <h2 className="m-2 mb-4 text-2xl font-extrabold text-slate-900 md:text-3xl">
            Coneix més sobre el nostre programa
          </h2> */}
          <div className="aspect-video w-full max-w-6xl">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/54Yeq8OoKS8"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <div className="flex flex-row justify-center my-8">
          <ButtonGo text="Veure més estadístiques..." href="/estadistiques" />
        </div>

        <section className="py-10 text-center text-sm font-semibold md:text-base lg:text-lg">
          <h2 className="m-2 text-2xl font-extrabold text-slate-900 md:text-3xl">Empreses</h2>
          <CompanyLogos />

        </section>


        <section className="mx-3 flex flex-col overflow-clip py-6 text-center text-sm md:text-base lg:text-lg">
          <h2 className="m-2 text-2xl font-extrabold text-slate-900 md:text-3xl">Coneix als nostres estudiants</h2>

          <div className="relative">
            <Carousel>
              <CarouselPrevious
                className={cn(
                  "absolute top-1/2 left-2 z-10 -translate-y-1/2",
                  "bg-upc hover:bg-upc/90 text-white hover:text-white/90",
                )}
              />
              <CarouselContent>
                {alumniData.map((alumni: any, index: number) => (
                  <CarouselItem key={index} className="basis-auto p-4 pb-10">
                    <AlumniCard alumni={alumni} className="border-upc/30 border" />
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
          </div>

          <div className="flex flex-row justify-center pb-12">
            <ButtonGo text="Veure més perfils d'estudiants..." href="/estudiants" />
          </div>
        </section>

        <section className="bg-white py-10 text-sm md:text-base lg:text-lg">
          <div className="mx-3">
            <div className="py-4">
              <h2 className="m-2 text-center text-2xl font-extrabold text-slate-900 md:text-3xl">
                Opinions dels nostres estudiants
              </h2>
              <Carousel>
                <CarouselPrevious
                  className={cn(
                    "absolute top-1/2 left-2 z-10 -translate-y-1/2",
                    "bg-upc hover:bg-upc/90 text-white hover:text-white/90",
                  )}
                />
                <CarouselContent>
                  {alumniReviews.map(
                    ({ firstName, lastName, generation, review, id }: AlumniReviewInfo, index: number) => (
                      <CarouselItem
                        key={index}
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
                    )
                  )}
                </CarouselContent>
                <CarouselNext
                  className={cn(
                    "bg-upc absolute top-1/2 right-2 z-10 -translate-y-1/2 text-white",
                    "bg-upc hover:bg-upc/90 text-white hover:text-white/90",
                  )}
                />
              </Carousel>
              <div className="flex flex-row justify-center pt-6">
                <ButtonGo text="Veure més opinions..." href="/opinions" />
              </div>
            </div>
          </div>
        </section>
        <section className="h-20"></section>
      </div>
    </main>
  )
}
