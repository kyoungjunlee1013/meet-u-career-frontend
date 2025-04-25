export interface MetricDTO {
  current: number;
  previous: number;
  growthRate: number;
}

export interface DashboardMetrics {
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
