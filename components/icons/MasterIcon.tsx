interface MasterIconProps {
  width?: number
  height?: number
}

export default function MasterIcon({ width = 15, height = 15 }: MasterIconProps) {
  return (
    <div className="flex-grow justify-center items-center" style={{ width: `${width}px`, height: `${height}px` }}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 15 17" fill="#009DE4">
        <path
          d="M0 16H14.625M0.75 9.25V16M14.25 9.25V16M4.125 5.49999V16M10.875 5.49999V16M0 9.25H3.75M15 9.25H11.25M3.375 5.49999H11.625M7.5 5.49999V3.23649M7.5 3.23649V1.72749C7.5 1.37199 7.5 1.19424 7.6095 1.08399C7.9545 0.736739 9.375 1.55724 9.915 1.89024C10.371 2.17074 10.5 2.73174 10.5 3.23649H7.5ZM7.5 16V14.5M6.375 8.5V8.875M8.625 8.5V8.875M6.375 11.5V11.875M8.625 11.5V11.875"
          stroke="#41ADDE"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
