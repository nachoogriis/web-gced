import AlumniPage from "../../components/AlumniPage"
import { dbAlumniGetAllCardsInfo } from "@/lib/db/alumni"

export default async function Home() {
  const alumniData = await dbAlumniGetAllCardsInfo()

  {
    /* TODO -> RECORDAR TREURE AIXÒ */
  }
  const replicatedAlumniData = Array(20)
    .fill(alumniData[0])
    .map((alumni, index) => ({
      ...alumni,
      id: `${alumni.id}-${index}`,
    }))

  return <AlumniPage initialAlumniData={replicatedAlumniData} />
}
