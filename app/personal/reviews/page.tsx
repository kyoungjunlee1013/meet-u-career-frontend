import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { ReviewsContent } from "@/components/personal/reviews/ReviewsContent"
import { Footer } from "@/components/home/Footer"

export default function ReviewsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1">
        <ReviewsContent />
      </main>
      <Footer />
    </div>
  )
}
