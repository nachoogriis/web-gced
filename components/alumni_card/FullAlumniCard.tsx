import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlumniCardInfo } from "@/lib/db/alumni"
import GcedButton from "../GcedButton"
import { InfoIcon } from "lucide-react"

type Props = {
  alumni: AlumniCardInfo
}
export default function FullAlumniCard({ alumni }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <GcedButton>
          <InfoIcon className="text-lg" />
          Més informació
        </GcedButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {alumni.firstName} {alumni.lastName}
          </DialogTitle>
        </DialogHeader>
        {alumni.tfgTitle}
      </DialogContent>
    </Dialog>
  )
}
