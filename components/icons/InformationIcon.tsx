interface InformationIconProps {
  width?: number
  height?: number
}

export default function InformationIcon({ width = 15, height = 15 }: InformationIconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 16 15" fill="none">
      <path
        d="M8 14C11.5899 14 14.5 11.0899 14.5 7.5C14.5 3.91015 11.5899 1 8 1C4.41015 1 1.5 3.91015 1.5 7.5C1.5 11.0899 4.41015 14 8 14Z"
        stroke="#009DE4"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 10.1V7.49999M8 4.89999H8.0065"
        stroke="#009DE4"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
