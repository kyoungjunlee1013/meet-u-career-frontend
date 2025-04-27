"use client";

import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AdBadge } from "@/components/business/jobs/AdBadge";

type JobType = {
  id: number;
  title: string;
  companyName: string;
  openingDate: string;
  expirationDate: string;
  statusLabel: string;
  // 광고 정보
  advertisements?: {
    adType: 1 | 2 | 3;
    startDate: string;
    endDate: string;
  }[];
  // 상단 AdBadge에서 사용하는 필드
  isAdvertised?: boolean;
  adType?: 1 | 2 | 3;
  adStartDate?: string;
  adEndDate?: string;
};

export default function JobPaymentPage() {
  // 실제 공고 데이터 fetch
  const params = useParams();
  const jobId = params?.id;
  const [job, setJob] = useState<JobType|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    if (jobId) {
      setLoading(true);
      setError(null);
      fetch(`/api/business/job/view/${jobId}`)
        .then(res => res.json())
        .then(data => setJob(data.data))
        .catch(() => setError('공고 데이터를 불러올 수 없습니다.'))
        .finally(() => setLoading(false));
    }
  }, [jobId]);

  // 광고 상품 리스트 하드코딩
  const adProducts = [
    {
      type: 1,
      label: "BASIC",
      dailyAmount: 5000,
      desc: "하단 노출",
    },
    {
      type: 2,
      label: "STANDARD",
      dailyAmount: 7000,
      desc: "중간 우선 노출",
    },
    {
      type: 3,
      label: "PREMIUM",
      dailyAmount: 10000,
      desc: "최상단 고정 + 광고 뱃지",
    },
  ];

  // 선택된 상품
  const [selectedType, setSelectedType] = useState("BASIC");
  const selectedProduct = adProducts.find(p => p.type === Number(selectedType));
  // 광고 적용 날짜 범위 상태
  const [adDateRange, setAdDateRange] = useState<[Date|null, Date|null]>([null, null]);
  // RangePicker에서 사용할 날짜 범위 계산
  const minDate = job?.openingDate ? new Date(job.openingDate) : undefined;
  const maxDate = job?.expirationDate ? new Date(job.expirationDate) : undefined;
  // 광고 일수 계산
  const durationDays = adDateRange[0] && adDateRange[1]
    ? Math.floor((adDateRange[1].getTime() - adDateRange[0].getTime()) / (1000*60*60*24)) + 1
    : 0;
  const totalAmount = selectedProduct ? selectedProduct.dailyAmount * durationDays : 0;

  // 광고 기간 비활성화용 excludeIntervals (useMemo)
  const excludeIntervals = useMemo(() => (
    job?.advertisements?.map(ad => ({
      start: (() => { const d = new Date(ad.startDate); d.setHours(0,0,0,0); return d; })(),
      end: (() => { const d = new Date(ad.endDate); d.setHours(23,59,59,999); return d; })(),
    })) || []
  ), [job?.advertisements]);

  // 디버깅: 광고 데이터와 excludeIntervals 콘솔 출력
  useEffect(() => {
    console.log("[DEBUG] job.advertisements:", job?.advertisements);
    console.log("[DEBUG] excludeIntervals:", excludeIntervals);
  }, [job?.advertisements, excludeIntervals]);

  // 광고 적용 기간 선택 시, 중간에 광고 기간이 포함되어 있으면 무효화
  const handleRangeChange = (update: [Date|null, Date|null]) => {
    if (update[0] && update[1]) {
      const hasOverlap = excludeIntervals.some(({ start, end }) =>
        update[0]! <= end && update[1]! >= start
      );
      if (hasOverlap) {
        toast.warn("선택한 기간에 이미 광고가 적용된 날짜가 포함되어 있습니다.");
        setAdDateRange([null, null]);
        return;
      }
    }
    setAdDateRange(update);
  };

  // Toss Payments 결제창 호출 핸들러
  const handleTossPayment = () => {
    // 광고 상품/기간 미선택 또는 일수 1 미만이면 결제 막기 (토스트 메시지)
    if (!selectedProduct || !adDateRange[0] || !adDateRange[1] || durationDays < 1) {
      toast.warn("광고 상품과 기간을 모두 선택해 주세요.");
      return;
    }
    if (!job) {
      toast.error("공고 정보를 불러오지 못했습니다.");
      return;
    }
    const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY;
    const redirectUrl = process.env.NEXT_PUBLIC_TOSS_REDIRECT_URI;
    const orderId = `${job.id}-${Date.now()}`;
    const orderName = `${job.title} - ${selectedProduct?.label} 광고`;
    const amount = totalAmount; // 총 결제 금액으로 변경
    console.log({ clientKey, redirectUrl, orderId, orderName, amount });
    if (typeof window === "undefined" || !(window as any).TossPayments) {
      alert("TossPayments SDK를 불러오지 못했습니다. 새로고침 후 다시 시도해 주세요.");
      return;
    }
    if (!clientKey || !redirectUrl) {
      alert("Toss 결제 환경변수가 올바르게 설정되어 있지 않습니다.");
      return;
    }
    const successUrl = `${redirectUrl}/business/jobs/${job.id}/payment/success?` +
  `transactionId=${orderId}` +
  `&orderId=${orderId}` +
  `&amount=${amount}` +
  `&adType=${selectedProduct?.type}` +
  `&durationDays=${durationDays}` +
  `&jobPostingId=${job.id}`;

const failUrl = `${redirectUrl}/business/jobs/${job.id}/payment/fail?transactionId=${orderId}`;
const tossPayments = (window as any).TossPayments(clientKey);
    tossPayments.requestPayment("카드", {
      amount,
      orderId,
      orderName,
      customerName: "홍길동", // 실제 사용자명으로 교체 필요
      successUrl,
      failUrl,
    });
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-center" autoClose={2000} />
      <BusinessHeader />
      <main className="max-w-[1200px] mx-auto px-6 py-6">
        <h1 className="text-2xl font-bold mb-6">공고 결제 페이지</h1>
        <div className="bg-white rounded shadow p-4 mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="text-xl font-semibold">{job?.title}</div>
            {/* 여러 광고 뱃지 표시 */}
            <div className="flex gap-2">
              {job?.advertisements?.map((ad, idx) => (
                <AdBadge
                  key={idx}
                  isAdvertised={true}
                  adType={ad.adType}
                  adStartDate={ad.startDate}
                  adEndDate={ad.endDate}
                />
              ))}
            </div>
          </div>
          <div className="text-gray-600 mb-1">{job?.companyName}</div>
          {/* 게시 기간 표시 */}
          {job?.openingDate && job?.expirationDate && (
            <div className="text-gray-700 text-sm mb-1">
              📅 공고 게시 기간: {new Date(job.openingDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
              ~ {new Date(job.expirationDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' })}
            </div>
          )}
          <div className="text-gray-500 text-sm mb-1">마감일: {job?.expirationDate ? new Date(job.expirationDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</div>
          <div className="text-blue-600 text-xs">{job?.statusLabel}</div>
        </div>

        {/* 광고 상품 선택 UI */}

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">광고 상품을 선택하세요</h2>
          <div className="flex gap-6 flex-wrap">
            {adProducts.map(product => (
              <button
                key={product.type}
                type="button"
                onClick={() => setSelectedType(product.type.toString())}
                className={`flex-1 min-w-[220px] max-w-[300px] p-5 rounded-lg border-2 transition-all shadow-sm text-left
                  ${selectedType === product.type.toString() ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300"}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-lg">{product.label}</span>
                  {selectedType === product.type.toString() && (
                    <span className="text-blue-600 font-bold">선택됨</span>
                  )}
                </div>
                <div className="text-blue-700 font-semibold mb-1">₩{product.dailyAmount.toLocaleString()}/일</div>
                <div className="text-sm text-gray-600">{product.desc}</div>
              </button>
            ))}
          </div>
          {/* 광고 적용 날짜 범위 선택 UI */}
          <div className="mt-6 flex flex-col gap-2">
            <label className="font-semibold mb-1">광고 적용 기간을 선택하세요</label>
            <DatePicker
              selectsRange
              startDate={adDateRange[0]}
              endDate={adDateRange[1]}
              onChange={handleRangeChange}
              excludeDateIntervals={excludeIntervals}
              minDate={minDate}
              maxDate={maxDate}
              dateFormat="yyyy.MM.dd"
              locale="ko"
              placeholderText="날짜 범위 선택"
              className="border px-3 py-2 rounded w-full max-w-xs"
              isClearable
              popperPlacement="bottom-start"
            />
            <span className="text-gray-600 text-sm">선택 가능: {minDate && minDate.toLocaleDateString('ko-KR')} ~ {maxDate && maxDate.toLocaleDateString('ko-KR')}</span>
          </div> 
        </div> 

        {/* 결제 금액 및 안내 */}
        <div className="bg-white rounded shadow p-4 flex flex-col sm:flex-row items-center justify-between mb-8">
          <div>
            <div className="text-sm text-gray-500 mb-1">선택한 상품</div>
            <div className="font-semibold text-lg">{selectedProduct?.label}</div>
            <div className="text-xs text-gray-400">{selectedProduct?.desc}</div>
            <div className="text-sm text-gray-700 mt-2">💰 단가: <span className="font-bold">₩{selectedProduct?.dailyAmount.toLocaleString()}</span>/일</div>
            <div className="text-sm text-gray-700">📅 광고 적용 기간: <span className="font-bold">{adDateRange[0] && adDateRange[1] ? `${adDateRange[0].toLocaleDateString('ko-KR')} ~ ${adDateRange[1].toLocaleDateString('ko-KR')}` : '--'}</span></div>
            <div className="text-sm text-gray-700">⏱️ 광고 일수: <span className="font-bold">{durationDays}일</span></div>
          </div>
          <div className="text-right mt-4 sm:mt-0">
            <div className="text-gray-500 text-sm">총 결제 금액</div>
            <div className="text-2xl font-bold text-blue-700">₩{totalAmount.toLocaleString()}</div>
          </div>
        </div>

        {/* 결제 버튼 */}
        <button
          className="w-full max-w-md mx-auto block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-lg shadow"
          onClick={handleTossPayment}
        >
          결제하기
        </button>
      </main>
    </div>
  );
}

