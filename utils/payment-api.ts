import { PaymentBusinessDTO, Page } from "./payment-types";

// API 공통 응답 타입
export interface ResultData<T> {
  success: boolean;
  count?: number;
  code?: number;
  message?: string;
  data: T;
}

// 관리자 전체 결제 내역 조회 (페이징 적용)
export async function fetchAdminPayments(page = 0, size = 20): Promise<Page<PaymentBusinessDTO>> {
  const res = await fetch(`/api/admin/payment/history?page=${page}&size=${size}`);
  if (!res.ok) throw new Error("결제 내역 조회 실패");
  const json: ResultData<Page<PaymentBusinessDTO>> = await res.json();
  return json.data;
}

// 관리자 결제 상세 조회
export async function fetchAdminPaymentDetail(transactionId: string): Promise<PaymentBusinessDTO> {
  const res = await fetch(`/api/admin/payment/${transactionId}`);
  if (!res.ok) throw new Error("결제 상세 조회 실패");
  const json: ResultData<PaymentBusinessDTO> = await res.json();
  return json.data;
}
