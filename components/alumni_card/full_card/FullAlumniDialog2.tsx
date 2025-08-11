import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { AlumniCardInfo } from "@/lib/db/alumni"
import { cn } from "@/lib/utils"
import { InfoIcon } from "lucide-react"
import FullAlumniCard from "./FullAlumniCard"

type Props = {
  alumni: AlumniCardInfo
  children: React.ReactNode
}
export default function FullAlumniDialog2({ alumni, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="lg:w-[40%] h-[90%] max-w-none">
        <FullAlumniCard alumni={alumni} />
      </DialogContent>
    </Dialog>
  )
}
