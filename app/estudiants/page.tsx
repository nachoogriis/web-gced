import AlumniPage from "../../components/AlumniPage"
import { dbAlumniGetAllCardsInfo } from "@/lib/db/alumni"

export default async function Home() {
  const alumniData = await dbAlumniGetAllCardsInfo()

  return <AlumniPage initialAlumniData={alumniData} />
}
