import { cn } from "@/lib/utils"

interface InfoCardLineProps {
  icon: React.ReactNode
  title: string
  description: string | undefined | null
  className?: string
}

export default function InfoCardLine({
  icon,
  title,
  description,
  className = "px-[30px] py-[5px]",
}: InfoCardLineProps) {
  return (
    <div className={cn("flex items-start gap-2", className)}>
      {/* Icono */}
      <div className="flex items-center justify-center text-[20px]">{icon}</div>

      <p className="text-black text-[12px] font-normal leading-normal">
        <span className="font-bold">{title}:</span> {description || "No especificat"}
      </p>
    </div>
  )
}
