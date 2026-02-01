type Props = {
  title: string
  subtitle?: string
}

export default function PageHeading({ title, subtitle }: Props) {
  return (
    <section className="px-4 pt-20 pb-10 text-center">
      <h1 className="text-upc text-6xl font-extrabold">{title}</h1>
      {subtitle && <p className="pt-3 text-base text-slate-600 md:text-lg">{subtitle}</p>}
    </section>
  )
}
