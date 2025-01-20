import AlumniCard from "@/components/alumni_card/AlumniCard";
import AlumniReview from "@/components/AlumniReview";
import BannerMainStats from "@/components/BannerMainStats";
import CompanyLogo from "@/components/CompanyLogo";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { dbAlumniGetAllCardsInfo, dbAlumniGetAllReviews } from "@/lib/db/alumni";

export default async function Home() {
  const alumniData = await dbAlumniGetAllCardsInfo();
  const alumniReviews = await dbAlumniGetAllReviews();

  // Duplica los datos para alumniData
  const replicatedAlumniData = Array(5) 
    .fill(alumniData[0]) 
    .map((alumni, index) => ({
      ...alumni,
      id: `${alumni.id}-${index}`, 
    }));

  // Duplica los datos para alumniReviews
  const replicatedReviews = Array(5) 
    .fill(alumniReviews[0])
    .map((review, index) => ({
      ...review,
      id: `${review.id}-${index}`, 
    }));

  return (
    <main>
      <section className="text-center py-10">
        <h1 className="text-5xl font-bold text-[#007BC0]">
          Grau en Ciència i Enginyeria de Dades
        </h1>
        <p className="py-2 text-lg text-[#007BC0]">
          Les dades són l'inici, el camí és teu
        </p>
      </section>

      <BannerMainStats />

      <section className="text-center text-xl font-semibold mb-6 py-4">
        <h2>Els nostres estudiants treballen a :</h2>
        <div className="relative overflow-hidden h-50">
          <div
            className="flex gap-4 justify-center animate-scroll mb-6"
            style={{
              width: "calc(200% + 1rem)",
            }}
          >
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
          </div>

          <div
            className="flex gap-4 justify-center animate-scroll1"
            style={{
              width: "calc(200% + 1rem)",
            }}
          >
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
            <CompanyLogo image="/google.png" />
          </div>
        </div>
      </section>


      <section className="py-4 overflow-clip">
        <h2 className="text-center text-xl font-semibold mb-6">
          Coneix als nostres estudiants
        </h2>
        <Carousel>
          <CarouselContent>
            {replicatedAlumniData.map((alumni, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <AlumniCard
                  firstName={alumni.firstName}
                  lastName={alumni.lastName}
                  generation={alumni.generation}
                  internships={alumni.internships}
                  tfgTitle={alumni.tfgTitle}
                  masters={alumni.masters}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      <section className="py-40">
        <div className="bg-gray-100 py-4">
          <h2 className="text-center text-xl font-semibold mb-6">
            Opinions dels nostres estudiants
          </h2>
          <Carousel>
            <CarouselContent>
              {replicatedReviews.map((review, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <AlumniReview
                    firstName={review.firstName}
                    lastName={review.lastName}
                    review={review.review}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="flex flex-row gap-10 justify-center"></div>
        </div>
      </section>
      <section className="h-20"></section>
    </main>
  );
}


