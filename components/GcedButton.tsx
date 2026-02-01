import { cn } from "@/lib/utils"

interface GcedButtonProps {
  children: React.ReactNode
  width?: string
}

export default function GcedButton({ children, width = "250px" }: GcedButtonProps) {
  return (
    <button
      type="button"
      style={{ width }}
      className={cn(
        "inline-flex items-center rounded-[10px] border-[1px]",
        "bg-white-600 border-[#009DE4] px-3 py-2 text-sm font-semibold",
        "text-[#009DE4] hover:bg-[#009DE4] hover:text-white",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "focus-visible:outline-[#009DE4]",
      )}
    >
      <div className="flex w-full items-center justify-center gap-[8px]">{children}</div>
    </button>
  )
}
