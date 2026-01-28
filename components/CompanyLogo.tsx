// components/CompanyLogo.tsx
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function CompanyLogo({
  image,
  className,
}: {
  image: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "shrink-0",
        "h-14 w-40 md:h-16 md:w-44 lg:h-16 lg:w-48", // <-- ALARGADO
        "rounded-xl bg-white",
        "ring-1 ring-black/5",
        "flex items-center justify-center",
        "px-4",
        className,
      )}
    >
      <Image
        src={image}
        alt="Company logo"
        width={220}
        height={80}
        className="h-full w-full object-contain"
        sizes="192px"
      />
    </div>
  )
}
