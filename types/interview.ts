// src/types/interview.ts

export interface Interview {
    id: number;
    companyName: string;
    jobTitle: string;
    date: string;
    status: number;
    logo: string;
    location?: string;
    time?: string;
    interviewer?: string;
    companyId: number;
    jobCategoryId: number;
    applicationId: number;
    canWriteReview?: boolean;
    createdAt?: string;
    rating?: number;
    difficulty?: number;
    questionsAsked?: string;
    interviewTip?: string;
    hasReview?: boolean;
    expirationDate?: string;
  }