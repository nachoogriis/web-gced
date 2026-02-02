import AlumniPage from "../../components/AlumniPage"
import { dbAlumniGetAllCardsInfo, dbAlumniGetAllReviews } from "@/lib/db/alumni"

export const dynamic = "force-dynamic"

export default async function Home() {
  const alumniData = await dbAlumniGetAllCardsInfo()
  const alumniReviews = await dbAlumniGetAllReviews()

  return <AlumniPage initialAlumniData={alumniData} alumniReviews={alumniReviews}/>
}
