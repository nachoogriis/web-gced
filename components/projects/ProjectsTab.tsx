import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectsList from "./ProjectsList"

export default function ProjectsTab({}) {
  return (
    <Tabs defaultValue="APs" className="w-[95%]">
      <TabsList className="w-full min-w-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-slate-100 text-black">
        <TabsTrigger value="APs" className="font-bold line-clamp-1 text-ellipsis">
          Algorismia i Programació
        </TabsTrigger>
        <TabsTrigger value="DL" className="font-bold line-clamp-1 text-ellipsis">
          Aprenentatge Profund
        </TabsTrigger>
        <TabsTrigger value="Others" className="font-bold line-clamp-1 text-ellipsis">
          Altres
        </TabsTrigger>
      </TabsList>
      <TabsContent value="APs">
        <ProjectsList topic="APs" />
      </TabsContent>
      <TabsContent value="DL">
        <ProjectsList topic="DL" />
      </TabsContent>
      <TabsContent value="Others">
        <ProjectsList topic="Others" />
      </TabsContent>
    </Tabs>
  )
}
