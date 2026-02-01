import { SVGProps } from "react"

export default function CarouselButtonLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 100"
      fill="currentColor"
      {...props}
    >
      {/* Flat-capped chevron pointing left, thicker in middle */}
      <polygon points="20,0 7,50 20,100 16,100 1,50 16,0" />
    </svg>
  )
}
