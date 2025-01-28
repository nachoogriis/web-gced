import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AlumniCardInfo } from "@/lib/db/alumni"
import { InfoIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import FullAlumniCard from "./FullAlumniCard"

type Props = {
  alumni: AlumniCardInfo
}
export default function FullAlumniDialog({ alumni }: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <div
          className={cn(
            "inline-flex items-center rounded-[10px] border-[1px]",
            "border-[#009DE4] bg-white-600 px-3 py-2 text-sm font-semibold",
            "text-[#009DE4] hover:text-white hover:bg-[#009DE4]",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
            "focus-visible:outline-[#009DE4]"
          )}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <InfoIcon />
            <h1>Més informació</h1>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[40%] h-[90%] max-w-none">
        <FullAlumniCard alumni={alumni} />
      </DialogContent>
    </Dialog>
  )
}
