export interface MetricDTO {
  current: number; // 현재 값
  previous: number; // 이전 값
  growthRate: number; // 성장률
}

export interface DashboardUserMetrics {
  userCount: MetricDTO | null;
  companyCount: MetricDTO | null;
  jobPostingCount: MetricDTO | null;
  communityPostCount: MetricDTO | null;
  userGrowthChart: { month: string; userCount: number }[];
  userTypeChart: UserTypeChartItem[];
}

export interface MetricCardsProps {
  userCount: MetricDTO;
  companyCount: MetricDTO;
  jobPostingCount: MetricDTO;
  communityPostCount: MetricDTO;
}

export interface UserGrowthChartProps {
  data: { month: string; userCount: number }[];
}

export interface UserTypeChartItem {
  accountType: number;
  count: number;
}

export interface UserDistributionChartProps {
  data: UserTypeChartItem[];
}

export interface DashboardJobPostingMetrics {
  totalJobPostings: MetricDTO; // 총 채용공고 수
  activeJobPostings: MetricDTO; // 활성 채용공고 수
  participatingCompanies: MetricDTO; // 참여 기업 수
  totalViews: MetricDTO; // 조회수
  jobPostingGrowthChart: MonthlyJobPostingCount[]; // 월별 공고 증가 추이
  locationStatistics: LocationJobPostingStats[]; // 지역별 공고
  jobPostingStatistics: JobPostingStatistics; // 공고 상태별 통계
  topCompanies: TopCompanyJobPostings[]; // 상위 기업 리스트
  keywordStatistics: PopularKeywordJobPostings[]; // 인기 키워드
}

export interface MonthlyJobPostingCount {
  month: string; // 월 (예: "1월", "2월", "3월" 등)
  jobPostingCount: number; // 해당 월의 공고 수
}

export interface LocationJobPostingStats {
  locationName: string; // 지역명 (예: "서울특별시")
  jobPostingCount: number; // 해당 지역의 공고 수
}

export interface JobPostingStatistics {
  activeCount: number; // 활성 상태 공고 수
  expiredCount: number; // 마감된 상태 공고 수
  draftCount: number; // 임시저장 상태 공고 수
  averageViewCount: number; // 평균 조회수
  averageApplyCount: number; // 평균 지원자 수
  averagePostingDays: number; // 평균 공고 게시 기간
}

export interface TopCompanyJobPostings {
  companyName: string; // 기업명
  jobPostingCount: number; // 해당 기업의 공고 수
}

export interface PopularKeywordJobPostings {
  keyword: string; // 키워드 (예: "소프트웨어개발")
  count: number; // 해당 키워드의 공고 수
}

export interface JobPostingGrowthChartData {
  month: string; // 예: "1월", "2월", "3월" 등
  jobPostingCount: number; // 해당 월의 채용공고 수
}

export interface JobPostingStatistics {
  activeCount: number;
  expiredCount: number;
  draftCount: number;
  averageViewCount: number;
  averageApplyCount: number;
  averagePostingDays: number;
}

export interface JobPostingStatusProps {
  data: JobPostingStatistics;
}

export interface TopCompany {
  companyName: string;
  jobPostingCount: number;
}

export interface KeywordStats {
  keyword: string;
  count: number;
}

export interface ApplicationMetric {
  current: number;
  previous: number;
  growthRate: number;
}

export interface ApplicationTrendDTO {
  current: number;
  previous: number;
  growthRate: number;
}

export interface ApplicationAgeGroup {
  ageGroup: string;
  count: number;
}

export interface ApplicationTimeStats {
  timeSlot: string;
  applied: number;
  canceled: number;
  modified: number;
}

export interface JobTypeData {
  categoryName: string;
  jobPostingCount: number;
}

export interface ApplicationTrends {
  date: string;
  totalApplications: number;
  acceptedApplications: number;
  rejectedApplication: number;
}

export interface DashboardApplicationMetrics {
  totalApplications: ApplicationMetric;
  acceptedApplications: ApplicationMetric;
  rejectedApplications: ApplicationMetric;
  conversionRates: { label: string; rate: number }[];
  applicationTrends: ApplicationTrends[];
  applicantAgeGroupChart: ApplicationAgeGroup[];
  top5Companies: TopCompanyJobPostings[];
  applicationTimeStats: ApplicationTimeStats[];
  jobCategoryPostings: JobTypeData[];
}
