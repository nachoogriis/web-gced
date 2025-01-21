import ProjectsTab from "@/components/projects/ProjectsTab"

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#007BC0]">Projectes</h1>

      <section className="flex items-center justify-center h-[100%] w-[100%]">
        <ProjectsTab/>
      </section>
    </main>
  )
}
