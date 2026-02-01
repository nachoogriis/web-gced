// components/CompanyLogo.tsx
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function Logo({ image, className }: { image: string; className?: string }) {
  return (
    <div
      className={cn(
        "shrink-0",
        "h-8 md:h-10 lg:h-12", // Fixed height (reduced by 40%), width auto from content
        "rounded-lg bg-white",
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
        className="h-full w-auto"
        sizes="192px"
      />
    </div>
  )
}
