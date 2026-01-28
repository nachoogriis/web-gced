"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

export default function HomeSlideshow({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      50,
    )
    return () => clearInterval(id)
  }, [images.length])

  if (!images.length) return null

  return (
    <div className="absolute inset-0 -z-10">
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          className={`
            object-cover transition-opacity duration-1000
            ${i === index ? "opacity-100" : "opacity-0"}
          `}
        />
      ))}
      {/* overlay para legibilidad */}
      <div className="absolute inset-0 bg-white/70" />
    </div>
  )
}
