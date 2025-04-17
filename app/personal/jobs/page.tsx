import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { JobsContent } from "@/components/personal/jobs/JobsContent"
import { Footer } from "@/components/home/Footer"

export default function JobsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1">
        <JobsContent />
      </main>
      <Footer />
    </div>
  )
}
