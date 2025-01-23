"use client";

import { useState } from "react";
import AlumniCard from "@/components/alumni_card/AlumniCard";
import { Input } from "@/components/ui/input";

export default function AlumniPage({ initialAlumniData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAlumni, setFilteredAlumni] = useState(initialAlumniData); 

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase(); 
    setSearchTerm(e.target.value);

const levenshteinDistance = (a, b) => {
    const matrix = Array.from({ length: a.length + 1 }, () =>
      Array(b.length + 1).fill(0)
    );
  
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;
  
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1, 
            matrix[i][j - 1] + 1, 
            matrix[i - 1][j - 1] + 1 
          );
        }
      }
    }
  
    return matrix[a.length][b.length];
  };
  
  const isSimilar = (word1, word2, threshold = 2) => {
    return levenshteinDistance(word1, word2) <= threshold;
  };
  

  const results = initialAlumniData.filter((alumni) => {
    const combinedData = [
      `${alumni.firstName || ""} ${alumni.lastName || ""}`, 
      String(alumni.generation || ""), 
      String(alumni.tfgTitle || ""), 
      ...(alumni.internships || []).flatMap((internship) => [
        String(internship.position || ""), 
        String(internship.organization || ""),
      ]),
      ...(alumni.masters || []).map((master) => String(master.name || "")), 
    ]
      .join(" ") 
      .toLowerCase(); 
  

    return search
      .toLowerCase() 
      .split(" ") 
      .every((term) =>
        combinedData.split(" ").some((dataWord) => isSimilar(term, dataWord))
      );
  });
  
      

    setFilteredAlumni(results); 
  };

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-[#007BC0] pt-10">Estudiants</h1>

      {/* Buscador con ShadCN UI */}
      <div className="flex flex-col items-center mb-6 py-10">
        <form
          onSubmit={(e) => e.preventDefault()} 
          className="w-full max-w-lg"
        >
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="🔍 Busca per paraules clau. Per exemple: Juan Perez Computer Vision..."
            className="w-full rounded-full border-gray-300"
          />
        </form>
      </div>

      {/* Tarjetas de alumnos */}
        <section className="flex items-center justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-slate-100 rounded px-6 py-6 w-[95%]">
                {filteredAlumni.map((alumni) => (
                <AlumniCard
                    key={alumni.id}
                    firstName={alumni.firstName}
                    lastName={alumni.lastName}
                    generation={alumni.generation}
                    internships={alumni.internships}
                    tfgTitle={alumni.tfgTitle}
                    masters={alumni.masters}
                />
                ))}
            </div>
      </section>

      {/* Mensaje si no hay resultados */}
      {filteredAlumni.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No s'han trobat resultats per a "{searchTerm}".
        </p>
      )}
    </main>
  );
}
