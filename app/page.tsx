"use client";

import { useState } from "react";
import AlumniCard from "@/components/alumni_card/AlumniCard";
import CompanyLogo from "@/components/CompanyLogo";
import BannerMainStats from "@/components/BannerMainStats";

export default function Home() {
  const alumniData = [
    {
      name: "Laura",
      surname: "Smith",
      generation: 2024,
      internship: "StartUpX",
      finalDegreeThesis: "Análisis de datos sociales",
      master: "AI y Machine Learning",
      work: "Científica de datos",
    },
    {
      name: "Ignacio",
      surname: "Gris",
      generation: 2021,
      internship: "AiBall",
      finalDegreeThesis: "No especificado",
      master: "De la vida",
      work: "No especificado",
    },
    {
      name: "Maria",
      surname: "Risques",
      generation: 2025,
      internship: "Mango",
      finalDegreeThesis: "No especificado",
      master: "No especificado",
      work: "Data Scientist",
    },
    {
      name: "Juan",
      surname: "Pérez",
      generation: 2022,
      internship: "Tech Corp",
      finalDegreeThesis: "Optimización de datos",
      master: "Big Data",
      work: "Ingeniero de datos",
    },
    {
      name: "Laura",
      surname: "Smith",
      generation: 2024,
      internship: "StartUpX",
      finalDegreeThesis: "Análisis de datos sociales",
      master: "AI y Machine Learning",
      work: "Científica de datos",
    },
  ];

  const [visibleIndex, setVisibleIndex] = useState(2);

  return (
    <main>
      <section className="text-center py-10">
        <h1 className="text-5xl font-bold text-[#007BC0]">
          Grau en Ciència i Enginyeria de Dades
        </h1>
        <p className="py-2 text-lg text-[#007BC0]">
          Converteixte en líder de l'era digital on les dades creen solucions
        </p>
      </section>

      <BannerMainStats />

      <section className="text-center py-6">
        <h2>Nuestros estudiantes trabajan en:</h2>
        <div className="flex flex-row gap-4 justify-center py-2">
          <CompanyLogo image="/google.png" />
          <CompanyLogo image="/google.png" />
          <CompanyLogo image="/google.png" />
          <CompanyLogo image="/google.png" />
        </div>
      </section>

      <div className="py-10">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Conoce a nuestros estudiantes
        </h2>
          <div className="flex gap-[35px] justify-center items-center ">
            {alumniData.map((alumni, index) => {
              const isCenterGroup =
                index === visibleIndex ||
                index === visibleIndex + 1 ||
                index === visibleIndex - 1;

              return (
                <div
                  key={index}
                  className={`snap-center flex-shrink-0 transition-transform duration-300 w-[320px] ${
                    isCenterGroup
                      ? "opacity-100 translate-y-0 scale-105" 
                      : "opacity-30 translate-y-6 scale-95" 
                  }`}
                >
                  <AlumniCard
                    name={alumni.name}
                    surname={alumni.surname}
                    generation={alumni.generation}
                    internship={alumni.internship}
                    finalDegreeThesis={alumni.finalDegreeThesis}
                    master={alumni.master}
                    work={alumni.work}
                  />
                </div>
              );
            })}
          </div>
      </div>
    </main>
  );
}
