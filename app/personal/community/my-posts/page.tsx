import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { MyPostsContent } from "@/components/personal/community/my-posts/MyPostsContent"
import { Footer } from "@/components/home/Footer"

export default function MyPostsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <MainNavigation />
      <main className="flex-1">
        <MyPostsContent />
      </main>
      <Footer />
    </div>
  )
}
