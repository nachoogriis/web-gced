export default function ProjectTitle({ title }: { title: string }) {
  return (
    <div className="flex flex-row items-center gap-3 bg-[#4BADD9] rounded-tl-xl rounded-tr-xl py-6 px-4">
      <h1 className="font-bold text-3xl text-[white] px-15 py-5">{title}</h1>
    </div>
  )
}
