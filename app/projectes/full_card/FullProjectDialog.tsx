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

      <DialogContent className="max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] max-w-4xl overflow-y-auto rounded-3xl border-0 bg-white p-4 shadow-2xl">
        <VisuallyHidden>
          <DialogTitle>Full Project Card</DialogTitle>
        </VisuallyHidden>

        <FullProjectCard project={project} />
      </DialogContent>
    </Dialog>
  )
}
