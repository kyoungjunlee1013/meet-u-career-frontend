"use client"

import { useEffect, useState } from "react"
import { ReviewCard } from "./ReviewCard"
import { apiClient } from "@/api/apiClient"

interface Review {
  id: number
  companyName: string
  questionsAsked: string
  jobCategoryName: string
  interviewYearMonth: string
  rating: number
}

interface Props {
  layout?: "grid" | "vertical"
}

export const FeaturedReviews = ({ layout = "grid" }: Props) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const res = await apiClient.get("/api/personal/interview-reviews/reviews/recently")
        setReviews(res.data.data || [])
      } catch (error) {
        console.error("최신 리뷰 불러오기 실패", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchLatestReviews()
  }, [])

  return (
    <div className="py-3">
      <h2 className="text-base font-semibold mb-3">최신 면접 리뷰</h2>

      {loading ? (
        <p className="text-gray-500 text-sm">불러오는 중...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">리뷰를 불러오는 데 실패했습니다.</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 text-sm">등록된 면접 후기가 없습니다.</p>
      ) : (
        <div className={layout === "vertical" ? "space-y-3" : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"}>
          {reviews.map((review, idx) => (
            <ReviewCard
              key={review.id}
              tag={`${review.companyName} | ${review.interviewYearMonth}`}
              title={
                review.questionsAsked.length > 36
                  ? `${review.questionsAsked.slice(0, 36)}...`
                  : review.questionsAsked
              }
              color={idx % 2 === 0 ? "teal" : "blue"}
            />
          ))}
        </div>
      )}
    </div>
  )
}
