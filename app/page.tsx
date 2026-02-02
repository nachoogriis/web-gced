import BannerMainStats from "@/components/BannerMainStats"
import ButtonGo from "@/components/ButtonGoStudents"
import CompanyLogos from "@/components/ComopanyLogos"
import HomeSlideshow from "@/components/HomeSlideshow"
import StudentsCarousel from "@/components/StudentsCarousel"
import TestimonisCarousel from "@/components/TestimonisCarousel"
import { dbAlumniGetAllCardsInfo, dbAlumniGetAllReviews } from "@/lib/db/alumni"
import { getHomeImages } from "@/lib/getHomeImages"

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

        <section className="py-10 text-center text-sm font-semibold md:text-base lg:text-lg">
          <CompanyLogos />
        </section>

        <div className="flex flex-row justify-center my-8">
          <ButtonGo text="Veure més estadístiques..." href="/estadistiques" />
        </div>

        <section className="flex flex-col py-6 text-center text-sm md:text-base lg:text-lg">
          <h2 className="m-2 text-2xl font-extrabold text-slate-900 md:text-3xl">Coneix als nostres graduats</h2>

          <div className="relative px-3 md:px-24">
            <StudentsCarousel students={alumniData} reviews={alumniReviews} maxItems={6} />
          </div>

          <div className="flex flex-row justify-center pb-12">
            <ButtonGo text="Veure més perfils de graduats..." href="/estudiants" />
          </div>
        </section>

        <section className="bg-white py-10 text-sm md:text-base lg:text-lg">
          <div className="px-3 md:px-24">
            <div className="py-4">
              <h2 className="m-2 text-center text-2xl font-extrabold text-slate-900 md:text-3xl">
                Testimonis dels nostres graduats
              </h2>
              <TestimonisCarousel reviews={alumniReviews} maxItems={6} />
            </div>
          </div>
        </section>
        <section className="h-20"></section>
      </div>
    </main>
  )
}
