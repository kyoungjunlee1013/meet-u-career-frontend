import { ReviewsHero } from "./ReviewsHero"
import { FeaturedReviews } from "./FeaturedReviews"
import { CompanyReviewList } from "./CompanyReviewList"
import { ReviewPolicy } from "./ReviewPolicy"

export const ReviewsContent = () => {
  return (
    <div className="min-h-screen bg-white">
      <ReviewsHero />
      <FeaturedReviews />
      <CompanyReviewList />
      <ReviewPolicy />
    </div>
  )
}
