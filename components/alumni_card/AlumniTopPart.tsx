import { cn } from "@/lib/utils"
import PersonIcon from "@/components/icons/PersonIcon"
import GenerationBadge from "./GenerationBadge"

interface AlumniTopPartProps {
  name: string
  surname: string
  generation: number
  id?: number
  variant?: "light" | "dark"
  size?: "normal" | "small"
  showGeneration?: boolean
}

export default function AlumniTopPart({ name, surname, generation, id = 0, variant = "light", size = "normal", showGeneration = true }: AlumniTopPartProps) {
  return (
    <div className={cn("flex w-full flex-row items-center", size === "small" ? "p-2" : "p-3")}>
      <div
        className={cn(
          "shrink-0 rounded-full bg-[#B0DAED]",
          size === "small" ? "h-[32px] w-[32px]" : "h-[75px] w-[75px]",
        )}
      >
        <PersonIcon name={name} surname={surname} />
      </div>

      <div className={cn("flex flex-col items-start justify-center", size === "small" ? "gap-1 p-2" : "gap-2 p-4")}>
        <div className="flex flex-row items-center gap-2">
          <p
            className={cn(
              "leading-none font-bold",
              size === "small" ? "text-sm" : "text-xl",
              variant === "dark" ? "text-white" : "text-black",
            )}
          >
            {name} {surname}
          </p>
        </div>
        {showGeneration && <GenerationBadge year={generation} variant={variant} size={size === "small" ? "small" : "normal"} />}
      </div>
    </div>
  )
}
