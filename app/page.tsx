import { Header } from "@/components/home/Header"
import { MainNavigation } from "@/components/home/MainNavigation"
import { SearchBar } from "@/components/home/SearchBar"
import { FeaturedJobs } from "@/components/home/FeaturedJobs"
import { PopularJobs } from "@/components/home/PopularJobs"
import { TrendingJobs } from "@/components/home/TrendingJobs"
import { RecentJobs } from "@/components/home/RecentJobs"
import { LatestJobs } from "@/components/home/LatestJobs"
import { Footer } from "@/components/home/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <MainNavigation />
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-6 w-full">
        <SearchBar />
        <FeaturedJobs />
        <PopularJobs />
        <TrendingJobs />
        <RecentJobs />
        <LatestJobs />
      </main>
      <Footer />
    </div>
  )
}
