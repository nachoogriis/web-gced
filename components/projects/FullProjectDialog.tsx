import GcedButton from "../GcedButton"
import { InfoIcon } from "../icons/InfoIcon"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "../ui/dialog"

export default function FullProjectDialog({}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <GcedButton width = "200px">
                    <div className="flex flex-row items-center justify-center gap-2">
                        <InfoIcon />
                        <h1>Més informació</h1>
                    </div>
                </GcedButton>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <VisuallyHidden>
                        <DialogTitle>
                            Full Project Card
                        </DialogTitle>
                    </VisuallyHidden>
                </DialogHeader>
                <h1>Full Project Card</h1>
            </DialogContent>
        </Dialog>
    )
}