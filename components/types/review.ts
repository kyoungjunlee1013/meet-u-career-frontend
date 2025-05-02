// types/review.ts
export interface Review {
  id: number;
  company: string;
  position: string;
  date: string;
  logo: string;
  jobCategory: string;
  careerLevel: number;
  interviewYearMonth: string;
  rating: number;
  difficulty: number;
  interviewType: number;
  interviewParticipants: number;
  questionsAsked: string;
  interviewTip: string;
  result: number;
  createdAt: string;
  updatedAt: string;
  companyId: number;
  jobCategoryId: number;
  applicationId: number;
}
