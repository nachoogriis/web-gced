import GcedButton from "../../GcedButton"
import { InfoIcon } from "../../icons/InfoIcon"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import FullProjectCard from "./FullProjectCard"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../../ui/dialog"

interface ProjectInfo {
  imagePath: string
  topic: string
  name: string
  description: string
}

export default function FullProjectDialog({
  project,
}: {
  project: ProjectInfo
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <GcedButton width="200px">
          <div className="flex flex-row items-center justify-center gap-2">
            <InfoIcon />
            <h1>Més informació</h1>
          </div>
        </GcedButton>
      </DialogTrigger>
      <DialogContent className="w-[90%] h-[90%] max-w-none">
          <DialogTitle>Full Project Card</DialogTitle>
        {/* <VisuallyHidden>
        </VisuallyHidden> */}
        <FullProjectCard project={project} />
      </DialogContent>
    </Dialog>
  )
}
