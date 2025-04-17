import { CompanyReviewsList } from "./CompanyReviewsList"
import { PopularCompanies } from "./PopularCompanies"

export const ReviewsMain = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <CompanyReviewsList />
      </div>
      <div className="w-full md:w-64">
        <PopularCompanies />
      </div>
    </div>
  )
}
