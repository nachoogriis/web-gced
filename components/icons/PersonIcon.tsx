import { cn } from "@/lib/utils"
import Image from "next/image"

interface PersonIconProps {
  name: string
  surname: string
  className?: string
}

const peopleWithoutLinkedin: Set<string> = new Set(["antoni-jubes-monforte"])

export default function PersonIcon({ name, surname, className }: PersonIconProps) {
  const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  const cleanName = removeAccents(name).toLowerCase()
  const cleanSurname = removeAccents(surname).toLowerCase()
  const concat_surnames = cleanSurname.split(" ").join("-")
  const filename = `${cleanName}-${concat_surnames}`

  const imageUrl = peopleWithoutLinkedin.has(filename)
    ? `/profile_pictures/blank-profile.png`
    : `/profile_pictures/${filename}.jpeg`

  return (
    <Image
      src={imageUrl}
      alt={`Profile picture for ${name} ${surname}`}
      width={1024}
      height={1024}
      className={cn("rounded-full", className)}
    />
  )
}
