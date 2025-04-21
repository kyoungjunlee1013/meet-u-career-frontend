'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import { PersonalHeader } from '@/components/personal/mypage/PersonalHeader'
import { PersonalSidebar } from '@/components/personal/mypage/PersonalSidebar'
import { OffersContent } from '@/components/personal/mypage/offers/OffersContent'
import { useSidebar } from '@/components/personal/mypage/SidebarProvider'

type TabType = '검토중' | '수락함' | '거절함'

export default function OffersPage() {
  const { sidebarOpen } = useSidebar()

  const [offers, setOffers] = useState<{
    id: number
    company: string
    position: string
    location: string
    deadline: string
    description: string
    status: TabType // 문자열로 타입 지정
  }[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const accountId = 1 // 임시 계정 ID

  useEffect(() => {
    axios
      .get(`/api/personal/mypage/offers/list/review/${accountId}`)
      .then((res) => {
        const rawList = res.data?.data?.offerList ?? []

        // ✅ 숫자 상태를 문자열로 변환
        const mapped = rawList.map((o: any, idx: number) => ({
          id: idx,
          company: o.companyName,
          position: '직무 미정',
          location: o.location,
          deadline: o.offerDate?.split('T')[0] ?? '날짜 미정',
          description: o.message,
          status: ((): TabType => {
            if (o.status === 1) return '수락함'
            if (o.status === 2) return '거절함'
            return '검토중'
          })()
        }))

        setOffers(mapped)
      })
      .catch((err) => {
        console.error('❌ 에러:', err)
        setError('오퍼 데이터를 불러올 수 없습니다.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-gray-50">
      <PersonalHeader />
      <div className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'md:pl-64' : 'md:pl-0'}`}>
        <PersonalSidebar activeItem="받은 제안" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <OffersContent offers={offers} loading={loading} error={error} />
        </div>
      </div>
    </main>
  )
}
