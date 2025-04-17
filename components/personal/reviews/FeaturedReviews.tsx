import { ReviewCard } from "./ReviewCard"

export const FeaturedReviews = () => {
  return (
    <div className="py-10 bg-gray-100">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <ReviewCard
            isHot={true}
            tag="신규 채용 (주)하이엔에... 에 대해 알려주세요!"
            title="신규 채용 (주)하이엔에... 에 대해 알려주세요!"
          />
          <ReviewCard
            isHot={true}
            tag="우아(우) 기업리뷰가 궁금하신 가요?"
            title="우아(우) 기업리뷰가 궁금하신 가요?"
          />
          <ReviewCard
            isHot={true}
            tag="에스케이하이... 에 대해 더욱 많은 사람들이 공유해주세요!"
            title="에스케이하이... 에 대해 더욱 많은 사람들이 공유해주세요!"
          />
          <ReviewCard
            isHot={true}
            tag="지금 최고 인기 있는 (주)네이버... 어떨까 알려 줄까?"
            title="회원님의 행복한 점심시간이 되길 바랍니다!"
            color="teal"
          />
          <ReviewCard isHot={true} tag="가장 HOT한 부동산업계... 리뷰" title="리뷰" />
          <ReviewCard
            isRecommended={true}
            tag="지금 채용중! 현대자동차(주) 채용 리뷰"
            title="현대자동차(주) 채용 리뷰"
            color="blue"
          />
          <ReviewCard
            isRecommended={true}
            tag="현대모비스(주) 채용 및 면접 보고"
            title="현대모비스(주) 채용 및 면접 보고"
          />
          <ReviewCard
            isRecommended={true}
            tag="(주)네이버... 채용 및 면접후기?"
            title="(주)네이버... 채용 및 면접후기?"
          />
          <ReviewCard
            isRecommended={true}
            tag="현대모비스(주) 채용 및 면접 보고"
            title="현대모비스(주) 채용 및 면접 보고"
          />
          <ReviewCard
            isRecommended={true}
            tag="(주)네이버... 채용 및 면접후기?"
            title="(주)네이버... 채용 및 면접후기?"
          />
        </div>
      </div>
    </div>
  )
}
