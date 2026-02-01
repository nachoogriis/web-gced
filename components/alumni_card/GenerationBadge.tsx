import { cn } from "@/lib/utils"

interface Props {
  year: number
  size?: "small" | "normal" | "large"
  variant?: "light" | "dark"
}
export default function GenerationBadge({ year, size = "normal", variant = "light" }: Props) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full",
        variant === "dark" ? "bg-white/20" : "bg-upc-light",
        size === "small" ? "p-0.5" : size === "normal" ? "p-0.5" : "px-1 py-1.5",
      )}
    >
      <p
        className={cn(
          "leading-normal font-medium",
          variant === "dark" ? "text-white" : "text-upc",
          size === "small" ? "px-1.5 text-[10px]" : size === "normal" ? "px-2 text-[12px]" : "px-3 text-[20px]",
        )}
      >
        {year}
      </p>
    </div>
  )
}
