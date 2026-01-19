import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import FullProjectCard from "./FullProjectCard"
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"

interface ProjectInfo {
  id: number
  name: string
  summary: string
  description: string
  topic: string
  tags: string
  images: string
}

type Props = {
  project: ProjectInfo
  children: React.ReactNode
}

export default function FullProjectDialog({ project, children }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[90%] h-[90%] max-w-none bg-gray-100">
        <VisuallyHidden>
          <DialogTitle>Full Project Card</DialogTitle>
        </VisuallyHidden>
        <FullProjectCard project={project} />
      </DialogContent>
    </Dialog>
  )
}
