interface CurrentJobIconProps {
  width?: number
  height?: number
}

export default function CurrentJobIcon({ width = 15, height = 15 }: CurrentJobIconProps) {
  return (
    <div className="flex-grow items-center justify-center" style={{ width: `${width}px`, height: `${height}px` }}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 15 15" fill="#009DE4">
        <path
          d="M1.5 15C1.0875 15 0.7345 14.8455 0.441 14.5366C0.1475 14.2276 0.0005 13.8558 0 13.4211V4.73684C0 4.30263 0.147 3.93105 0.441 3.6221C0.735 3.31316 1.088 3.15842 1.5 3.15789H4.5V1.57895C4.5 1.14474 4.647 0.773158 4.941 0.464211C5.235 0.155263 5.588 0.000526316 6 0H9C9.4125 0 9.76575 0.154737 10.0597 0.464211C10.3537 0.773684 10.5005 1.14526 10.5 1.57895V3.15789H13.5C13.9125 3.15789 14.2657 3.31263 14.5597 3.6221C14.8537 3.93158 15.0005 4.30316 15 4.73684V13.4211C15 13.8553 14.8532 14.2271 14.5597 14.5366C14.2662 14.8461 13.913 15.0005 13.5 15H1.5ZM1.5 13.4211H13.5V4.73684H1.5V13.4211ZM6 3.15789H9V1.57895H6V3.15789Z"
          fill="#41ADDE"
        />
      </svg>
    </div>
  )
}
