interface TfgIconProps {
  width?: number
  height?: number
}

export default function TfgIcon({ width = 15, height = 15 }: TfgIconProps) {
  return (
    <div className="flex-grow justify-center items-center" style={{ width: `${width}px`, height: `${height}px` }}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 15 15" fill="#009DE4">
        <path
          d="M7.5 0L0 5L2.72727 6.81667V11.8167L7.5 15L12.2727 11.8167V6.81667L13.6364 5.90833V11.6667H15V5L7.5 0ZM12.15 5L7.5 8.1L2.85 5L7.5 1.9L12.15 5ZM10.9091 10.8333L7.5 13.1L4.09091 10.8333V7.725L7.5 10L10.9091 7.725V10.8333Z"
          fill="#41ADDE"
        />
      </svg>
    </div>
  )
}
