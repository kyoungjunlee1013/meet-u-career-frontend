import { PaymentBusinessDTO, Page } from "./payment-types";
import { apiClient } from "@/api/apiClient";

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
  const res = await apiClient.get(`/api/admin/payment/history?page=${page}&size=${size}`);
  if (!res.data || !res.data.data) throw new Error("결제 내역 조회 실패");
  return res.data.data;
}

// 관리자 결제 상세 조회
export async function fetchAdminPaymentDetail(transactionId: string): Promise<PaymentBusinessDTO> {
  const res = await apiClient.get(`/api/admin/payment/${transactionId}`);
  if (!res.data || !res.data.data) throw new Error("결제 상세 조회 실패");
  return res.data.data;
}
