"use client"

import { useEffect, useState } from "react"
import { ReviewCard } from "./ReviewCard"

interface Review {
  id: number
  companyName: string
  questionsAsked: string
  jobCategoryName: string
  interviewYearMonth: string
  rating: number
}

export const FeaturedReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([])

  useEffect(() => {
    const fetchLatestReviews = async () => {
      try {
        const res = await fetch("/api/personal/interview-reviews/reviews/recently")
        const json = await res.json()
        setReviews(json.data)
      } catch (error) {
        console.error("최신 리뷰 불러오기 실패", error)
      }
    }

    fetchLatestReviews()
  }, [])

  return (
    <div className="py-10 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-xl font-semibold mb-4">📝 최신 면접 리뷰</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reviews.map((review, idx) => (
            <ReviewCard
              key={review.id}
              tag={`${review.companyName} | ${review.interviewYearMonth}`}
              title={review.questionsAsked.length > 40
                ? `${review.questionsAsked.slice(0, 40)}...`
                : review.questionsAsked}
              color={idx % 2 === 0 ? "teal" : "blue"}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
