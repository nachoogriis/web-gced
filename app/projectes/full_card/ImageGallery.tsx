import Image from "next/image"
import { useState } from "react"

export default function ImageGallery({ projectImages }: { projectImages: string }) {
  const imagePaths = projectImages.match(/\[([^\]]+)\]/g)?.map((str) => str.slice(1, -1)) || []
  const data = imagePaths.map((s) => ({ imagePath: `/projects/${s}` }))

  const [active, setActive] = useState(data[0].imagePath)

  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-center">
        <Image
          width={651}
          height={465}
          className="h-[250px] w-auto rounded-lg object-cover object-center"
          src={active}
          alt=""
        />
      </div>
      <div className="flex flex-row items-center justify-center gap-5">
        {data.map(({ imagePath }, index) => (
          <div key={index}>
            <Image
              width={651}
              height={465}
              onClick={() => setActive(imagePath)}
              src={imagePath}
              className={`h-[80px] w-[108px] cursor-pointer rounded-lg object-cover object-center ${
                active === imagePath ? "border-2 border-black" : ""
              }`}
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
