import { IconLoading } from "@/components/icons/loading"

export const dynamic = "force-static"

export default function Loading() {
  return (
    <main className="fixed inset-0 flex justify-center items-center">
      <IconLoading className="w-12 h-12" />
    </main>
  )
}
