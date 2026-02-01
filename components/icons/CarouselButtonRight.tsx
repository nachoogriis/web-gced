import { SVGProps } from "react"

export default function CarouselButtonRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 100"
      fill="currentColor"
      {...props}
    >
      {/* Flat-capped chevron pointing right, thicker in middle */}
      <polygon points="4,0 17,50 4,100 8,100 23,50 8,0" />
    </svg>
  )
}
