import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AlumniCardInfo, AlumniReviewInfo } from "@/lib/db/alumni"
import FullAlumniCard from "./FullAlumniCard"

type Props = {
  alumni: AlumniCardInfo
  review: AlumniReviewInfo | undefined
  children: React.ReactNode
}
export default function FullAlumniDialogTrigger({ alumni, review, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <FullAlumniCard alumni={alumni} review={review}/>
    </Dialog>
  )
}
