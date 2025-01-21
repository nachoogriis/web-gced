"use client"; // Declaración de componente cliente

import { useState } from "react";
import AlumniCard from "@/components/alumni_card/AlumniCard";
import { Input } from "@/components/ui/input";

export default function AlumniPage({ initialAlumniData }) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredAlumni, setFilteredAlumni] = useState(initialAlumniData); // Estado para los datos filtrados

  // Manejar el cambio en el campo de búsqueda
  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase(); // Convertir a minúsculas para búsqueda insensible a mayúsculas
    setSearchTerm(e.target.value);

    // Función para calcular la distancia de Levenshtein
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
            matrix[i - 1][j] + 1, // Eliminación
            matrix[i][j - 1] + 1, // Inserción
            matrix[i - 1][j - 1] + 1 // Sustitución
          );
        }
      }
    }
  
    return matrix[a.length][b.length];
  };
  
  // Función para verificar si una palabra es similar a otra
  const isSimilar = (word1, word2, threshold = 2) => {
    return levenshteinDistance(word1, word2) <= threshold;
  };
  
  // Filtrar los datos
  const results = initialAlumniData.filter((alumni) => {
    // Combinar todos los campos relevantes en una sola cadena de texto
    const combinedData = [
      `${alumni.firstName || ""} ${alumni.lastName || ""}`, // Nombre completo
      String(alumni.generation || ""), // Generación
      String(alumni.tfgTitle || ""), // Título del TFG
      ...(alumni.internships || []).flatMap((internship) => [
        String(internship.position || ""), // Puesto del internship
        String(internship.organization || ""), // Organización del internship
      ]),
      ...(alumni.masters || []).map((master) => String(master.name || "")), // Nombre de los másters
    ]
      .join(" ") // Combina todo en una sola cadena
      .toLowerCase(); // Convierte a minúsculas para búsqueda insensible a mayúsculas/minúsculas
  
    // Dividir los términos de búsqueda por espacios y verificar similitud
    return search
      .toLowerCase() // Convertir el término de búsqueda a minúsculas
      .split(" ") // Dividir en palabras individuales
      .every((term) =>
        combinedData.split(" ").some((dataWord) => isSimilar(term, dataWord))
      );
  });
  
      

    setFilteredAlumni(results); // Actualizar los resultados filtrados
  };

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-center text-[#007BC0] pt-10">Estudiants</h1>

      {/* Buscador con ShadCN UI */}
      <div className="flex flex-col items-center mb-6 py-10">
        <form
          onSubmit={(e) => e.preventDefault()} // Prevenir la recarga de página
          className="w-full max-w-lg"
        >
          <Input
            type="text"
            value={searchTerm}
            onChange={handleSearch} // Manejar el evento de búsqueda
            placeholder="🔍 Busca per paraules clau..."
            className="w-full rounded-full border-gray-300"
          />
        </form>
      </div>

      {/* Tarjetas de alumnos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
