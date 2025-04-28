// 결제 DTO (PaymentBusinessDTO)
export interface PaymentBusinessDTO {
  id: number;
  accountId: number;
  amount: number;
  status: number; // 0: 실패, 1: 성공
  provider: number; // 1: TOSS, 2: KAKAO, 3: NAVER
  method: number; // 1: CARD, 2: KAKAO_PAY, 3: NAVER_PAY, 4: TOSS_PAY
  transactionId: string;
  createdAt: string;
  updatedAt: string;
  // 광고/공고 등 추가 필드는 필요시 확장
}

// 페이징 타입
export interface Page<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

// 상태, 결제수단, 공급자 등 매핑 테이블
export const statusLabelMap = {
  0: "실패",
  1: "성공",
};

export const providerLabelMap = {
  1: "TOSS",
  2: "KAKAO",
  3: "NAVER",
};

export const methodLabelMap = {
  1: "카드",
  2: "카카오페이",
  3: "네이버페이",
  4: "토스페이",
};

// 광고 상태 라벨맵
export const advertisementStatusLabelMap = {
  0: "대기",
  1: "진행중",
  2: "종료",
  3: "취소",
};
