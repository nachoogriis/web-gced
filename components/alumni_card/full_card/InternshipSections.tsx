interface InternshipType {
  position: string
  description: string
  organization: string
  country: string
}

type Props = {
  internships: InternshipType[]
}

const InternshipSection: React.FC<Props> = ({ internships }) => {
  return (
    <section>
      <h2 className="text-m text-[#007BC0] font-bold border-b pb-1 mt-6 mb-2 ">
        Pràctiques a empresa
      </h2>
      {internships.map((internship, index) => (
        <div key={index} className="mb-4">
          <p className="text-sm">
            <span className="font-bold">Empresa:</span>{" "}
            {internship.organization}
          </p>
          <p className="text-sm">
            <span className="font-bold">País:</span> {internship.country}
          </p>
          <p className="text-sm">
            <span className="font-bold">Tema:</span> {internship.position}
          </p>
          <p className="text-sm">
            <span className="font-bold">Descripció:</span>{" "}
            {internship.description}
          </p>
        </div>
      ))}
    </section>
  )
}

export default InternshipSection