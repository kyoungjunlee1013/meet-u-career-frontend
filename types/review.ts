export interface Review {
    id: number;                          // 리뷰 고유 ID
    company: string;                    // 회사 이름
    position: string;                   // 직무명 또는 포지션
    date: string;                       // 면접 일자 (yyyy-MM-dd)
    logo: string;                       // 회사 로고 URL
  
    jobCategory: string;                // 직무 카테고리 이름
    careerLevel: number;               // 신입/경력 여부 (0: 신입, 1: 경력)
    interviewYearMonth: string;        // 면접 연월 (예: "2025-04")
    
    rating: number;                     // 전반적 평가 (0: 부정적, 1: 보통, 2: 긍정적)
    difficulty: number;                // 난이도 (1~5)
    interviewType: number;             // 면접 유형 (비트마스크)
    interviewParticipants: number;     // 면접 인원 유형 (0: 1:1, 1: 다대1, 2: 그룹면접)
  
    questionsAsked: string;            // 받았던 질문
    interviewTip: string;              // 면접 팁
    result: number;                    // 결과 (0: 불합격, 1: 합격, 2: 대기중)
  
    createdAt: string;                 // 작성일시
    updatedAt: string;                 // 수정일시
  }
  