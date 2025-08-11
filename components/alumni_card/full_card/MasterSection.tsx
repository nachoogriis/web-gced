interface MasterType {
  name: string
  description: string
  universities: string
  country: string
}

type Props = {
  masters: MasterType[]
}

const MasterSection: React.FC<Props> = ({ masters }) => {
  return (
    <section>
      <h2 className="text-m text-[#007BC0] font-bold border-b pb-1 mt-6 mb-2">Màster</h2>
      {masters.map((master, index) => (
        <div key={index} className="mb-4">
          <p className="text-sm">
            <span className="font-bold">Títol del màster:</span> {master.name}
          </p>
          <p className="text-sm">
            <span className="font-bold">País:</span> {master.country}
          </p>
          <p className="text-sm">
            <span className="font-bold">Universitats:</span> {master.universities}
          </p>
          <p className="text-sm">
            <span className="font-bold">Descripció:</span> {master.description}
          </p>
        </div>
      ))}
    </section>
  )
}

export default MasterSection
