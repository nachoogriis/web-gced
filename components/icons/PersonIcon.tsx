import { cn } from "@/lib/utils"
import Image from "next/image"

interface PersonIconProps {
  id?: number
  className?: string
}

export default function PersonIcon({ id = 0, className }: PersonIconProps) {
  const imageUrl = `/fake_profile_pictures/${id}.jpeg`

  return (
    <Image
      src={imageUrl}
      alt={`Profile picture ${id}`}
      width={1024}
      height={1024}
      className={cn("rounded-full", className)}
    />
  )
}
