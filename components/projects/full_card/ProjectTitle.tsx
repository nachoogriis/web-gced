export default function ProjectTitle({
    title
} : {
    title: string
}) {
    return (
        <div className="flex flex-row items-center gap-3">
            <div className="w-[1em] h-[6em] bg-gradient-to-b from-[#007BC0] to-white"></div>
            <h1 className="font-bold text-3xl text-[#007BC0]">
                {title}
            </h1>
        </div>
    )
}