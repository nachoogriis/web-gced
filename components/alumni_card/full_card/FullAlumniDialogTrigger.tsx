import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AlumniCardInfo } from "@/lib/db/alumni"
import FullAlumniCard from "./FullAlumniCard"

type Props = {
  alumni: AlumniCardInfo
  children: React.ReactNode
}
export default function FullAlumniDialogTrigger({ alumni, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <FullAlumniCard alumni={alumni} />
    </Dialog>
  )
}
