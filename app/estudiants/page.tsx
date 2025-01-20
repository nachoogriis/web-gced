// import AlumniCard from "@/components/alumni_card/AlumniCard";
// import { dbAlumniGetAllCardsInfo } from "@/lib/db/alumni";

// export default async function Home() {
//   const alumniData = await dbAlumniGetAllCardsInfo(); // Obtener datos en el servidor
  
//   const replicatedAlumniData = Array(20) 
//     .fill(alumniData[0]) 
//     .map((alumni, index) => ({
//       ...alumni,
//       id: `${alumni.id}-${index}`, 
//     }));

//   return (
//     <main className="p-4">
//       <h1 className="text-3xl font-bold mb-4">Estudiants:</h1>

//       <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {replicatedAlumniData.map((alumni) => (
//           <AlumniCard
//             key={alumni.id}
//             firstName={alumni.firstName}
//             lastName={alumni.lastName}
//             generation={alumni.generation}
//             internships={alumni.internships}
//             tfgTitle={alumni.tfgTitle}
//             masters={alumni.masters}
//           />
//         ))}
//       </section>

//       {/* Mensaje si no hay resultados */}
//       {alumniData.length === 0 && (
//         <p className="text-center text-gray-500 mt-6">
//           No s'han trobat resultats.
//         </p>
//       )}
//     </main>
//   );
// }

import AlumniCard from "@/components/alumni_card/AlumniCard";
import { dbAlumniGetAllCardsInfo } from "@/lib/db/alumni";
import GcedButton from "@/components/GcedButton";
import { InfoIcon } from "@/components/icons/InfoIcon";


export default async function Home() {
  // Capturar el término de búsqueda desde los parámetros de consulta
  const alumniData = await dbAlumniGetAllCardsInfo();
  const replicatedAlumniData = Array(20) 
    .fill(alumniData[0]) 
    .map((alumni, index) => ({
      ...alumni,
      id: `${alumni.id}-${index}`, 
    }));


  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Estudiants</h1>

      {/* Buscador */}
      <div className="flex flex-col items-center mb-6">
        <form method="get" action="/" className="flex flex-col items-center gap-4 w-full max-w-lg">
          <input
            type="text"
            name="search"
            placeholder="Busca per paraules clau..."
            className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <GcedButton>
            <InfoIcon className="text-lg" />
            Buscar
          </GcedButton>
        </form>
      </div>

      {/* Tarjetas de alumnos */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {replicatedAlumniData.map((alumni) => (
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
      {replicatedAlumniData.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No s'han trobat resultats per a "{searchTerm}".
        </p>
      )}
    </main>
  );
}

