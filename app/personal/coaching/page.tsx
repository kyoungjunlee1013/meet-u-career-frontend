import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { CoachingContent } from "@/components/personal/coaching/CoachingContent"
import { Footer } from "@/components/home/Footer"

export default function CoachingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1 bg-gray-50">
        <CoachingContent />
      </main>
      <Footer />
    </div>
  )
}
