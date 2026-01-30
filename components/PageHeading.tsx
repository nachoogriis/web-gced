type Props = {
  title: string
  subtitle?: string
}

export default function PageHeading({ title, subtitle }: Props) {
  return (
    <section className="text-center py-10 px-4">
      <h1 className="text-6xl font-bold text-upc">{title}</h1>
      {subtitle && (
        <p className="text-base md:text-lg text-slate-600 pt-3">{subtitle}</p>
      )}
    </section>
  )
}
