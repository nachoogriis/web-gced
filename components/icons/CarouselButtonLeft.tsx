import { SVGProps } from "react"

export default function CarouselButtonLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="18,10 6,50 18,90" />
    </svg>
  )
}
