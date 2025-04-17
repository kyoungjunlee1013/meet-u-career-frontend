import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { CommunityContent } from "@/components/personal/community/CommunityContent"
import { Footer } from "@/components/home/Footer"

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1 bg-gray-50">
        <CommunityContent />
      </main>
      <Footer />
    </div>
  )
}
