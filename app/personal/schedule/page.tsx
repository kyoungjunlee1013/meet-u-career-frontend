import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { ScheduleContent } from "@/components/personal/schedule/ScheduleContent"
import { Footer } from "@/components/home/Footer"

export default function SchedulePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1 bg-gray-50">
        <ScheduleContent />
      </main>
      <Footer />
    </div>
  )
}
