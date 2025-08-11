type Props = {
  currentJob: string
}

const CurrentJobSection: React.FC<Props> = ({ currentJob }) => {
  return (
    <section>
      <h2 className="text-m text-[#007BC0] font-bold border-b pb-1 mt-6 mb-2">Feina Actual</h2>
      <div className="mb-4">
        <p className="text-sm">
          <span className="font-bold">Lloc de treball:</span> {currentJob}
        </p>
      </div>
    </section>
  )
}

export default CurrentJobSection
