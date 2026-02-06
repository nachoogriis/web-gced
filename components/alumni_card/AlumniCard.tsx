"use client"

import Image from "next/image"
import FullAlumniDialogTrigger from "./full_card/FullAlumniDialogTrigger"
import GenerationBadge from "./GenerationBadge"
import { AlumniCardInfo, AlumniReviewInfo } from "@/lib/db/alumni"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"


const peopleWithoutLinkedin: Set<string> = new Set(["antoni-jubes-monforte"])
const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

function getProfileImageUrl(firstName: string, lastName: string) {
  const cleanName = removeAccents(firstName).toLowerCase()
  const cleanSurname = removeAccents(lastName).toLowerCase()
  const filename = `${cleanName}-${cleanSurname.split(" ").join("-")}`

  return peopleWithoutLinkedin.has(filename)
    ? `/profile_pictures/blank-profile.png`
    : `/profile_pictures/${filename}.jpeg`
}

type Props = {
  alumni: AlumniCardInfo
  review: AlumniReviewInfo | undefined
  className?: string
}

export default function AlumniCard({ alumni, review, className }: Props) {
  const {
    firstName,
    lastName,
    generation,
    currentJobDescription,
    currentPosition,
    currentOrganization,
  } = alumni

  const subtitle =
    currentPosition && currentOrganization
      ? `${currentPosition} · ${currentOrganization}`
      : currentPosition || currentOrganization || ""

  const description =
    currentJobDescription?.trim() ||
    "Experiència professional actual dins del sector."

  const imageUrl = getProfileImageUrl(firstName, lastName)

  return (
    <FullAlumniDialogTrigger alumni={alumni} review={review}>
      <div
        className={cn(
          "group w-full max-w-[300px]", // smaller overall width
          "cursor-pointer overflow-hidden rounded-2xl bg-white", // slightly smaller radius
          "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg", // smaller hover
          className,
        )}
      >
        {/* IMAGE — slightly less tall */}
        <div className="relative w-full aspect-[16/15] bg-gray-100">
          <Image
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            fill
            sizes="(max-width: 768px) 100vw, 300px" // fix sizes (your 50px was wrong)
            className="object-cover object-center"
          />
          <div className="absolute right-3 top-3">
            <GenerationBadge year={generation} />
          </div>
        </div>

        {/* TEXT — tighter */}
        <div className="flex flex-col gap-3 p-4">
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-800">
            {description}
          </p>

          <div>
            <div className="text-sm font-semibold text-black">
              {firstName} {lastName}
            </div>
            {subtitle && (
              <div className="text-xs text-gray-500">{subtitle}</div>
            )}
          </div>

          {/* CTA */}
          <span
            className={cn(
              "mt-1 block text-[11px] leading-tight text-gray-400",
              "opacity-0 transition-opacity duration-200",
              "group-hover:opacity-100",
            )}
          >
            Veure fitxa completa
          </span>

          </div>
      </div>
      {/* TEXT — tighter */}

    </FullAlumniDialogTrigger>
  )
}
