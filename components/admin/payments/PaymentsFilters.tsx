import { Search, ChevronDown, Calendar } from "lucide-react"

export default function PaymentsFilters() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <select
            className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>
              상태 선택
            </option>
            <option value="all">전체</option>
            <option value="pending">대기중</option>
            <option value="completed">완료</option>
            <option value="canceled">취소</option>
            <option value="refunded">환불</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>

        <div className="relative">
          <select
            className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>
              결제사 선택
            </option>
            <option value="all">전체</option>
            <option value="stripe">Stripe</option>
            <option value="paypal">PayPal</option>
            <option value="kakaopay">KakaoPay</option>
            <option value="naverpay">NaverPay</option>
            <option value="toss">토스페이먼츠</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>

        <div className="relative">
          <select
            className="w-full appearance-none bg-white border border-gray-300 rounded-md py-2 pl-4 pr-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            defaultValue=""
          >
            <option value="" disabled>
              결제 방법 선택
            </option>
            <option value="all">전체</option>
            <option value="card">카드결제</option>
            <option value="bank">계좌이체</option>
            <option value="virtual">가상계좌</option>
            <option value="phone">휴대폰</option>
            <option value="point">포인트</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>

        <div className="relative">
          <div className="flex items-center w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
            <Calendar size={16} className="text-gray-400 mr-2" />
            <span className="text-gray-500">날짜 선택</span>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="relative flex-grow mr-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="거래 ID 또는 제휴 ID 검색"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
          검색
        </button>
      </div>
    </div>
  )
}
