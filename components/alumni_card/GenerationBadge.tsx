import { cn } from "@/lib/utils"

interface Props {
  year: number
  size?: "normal" | "large"
}
export default function GenerationBadge({ year, size = "normal" }: Props) {
  return (
    <div
      className={cn(
        "flex justify-center items-center rounded-full bg-upc-light",
        size === "normal" ? "p-0.5" : "px-1 py-1.5",
      )}
    >
      <p
        className={cn(
          "text-upc font-medium leading-normal",
          size === "normal" ? "px-2 text-[12px]" : "px-3 text-[20px]",
        )}
      >
        {year}
      </p>
    </div>
  )
}
