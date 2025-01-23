import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProjectsList from "./ProjectsList"

export default function ProjectsTab({}) {
    return (
        <Tabs defaultValue="APs" className="w-[95%]">
            <TabsList className="grid w-full grid-cols-3 bg-slate-100 text-black">
                <TabsTrigger value="APs" className="font-bold">
                    Algorismia i Programació
                </TabsTrigger>
                <TabsTrigger value="DL" className="font-bold">
                    Aprenentatge Profund
                </TabsTrigger>
                <TabsTrigger value="PE" className="font-bold">
                    Projectes d'Enginyeria
                </TabsTrigger>
            </TabsList>
            <TabsContent value="APs">
                <ProjectsList topic="APs"/>
            </TabsContent>
            <TabsContent value="DL">
                <ProjectsList topic="DL"/>
            </TabsContent>
            <TabsContent value="PE">
                <ProjectsList topic="PE"/>
            </TabsContent>
        </Tabs>
    )
}