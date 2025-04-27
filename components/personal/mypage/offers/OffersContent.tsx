"use client"

import axios from "axios"
import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { OffersHeader } from "./OffersHeader"
import { OffersStats } from "./OffersStats"
import { OffersTabs, type TabType } from "./OffersTabs"
import { OffersFilter } from "./OffersFilter"
import { OfferCard } from "./OfferCard"

interface Offer {
  id: number
  company: string
  position: string
  location: string
  deadline: string
  description: string
  status: '검토중' | '수락함' | '거절함'
}

interface OffersContentProps {
  offers: Offer[]
  loading: boolean
  error: string | null
}

export function OffersContent({ offers = [], loading, error }: OffersContentProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const rawTab = searchParams.get("tab")
  const isValidTab = (val: string | null): val is TabType => {
    return val === '전체' || val === '검토중' || val === '수락함' || val === '거절함'
  }
  const initialTab: TabType = isValidTab(rawTab) ? rawTab : '전체'

  const [activeTab, setActiveTab] = useState<TabType>(initialTab)
  const [localOffers, setLocalOffers] = useState<Offer[]>([])

  useEffect(() => {
    const fixed: Offer[] = offers.map((o) => ({
      ...o,
      status: o.status as '검토중' | '수락함' | '거절함',
    }))
    setLocalOffers(fixed)
  }, [offers])

  const counts = useMemo(() => {
    return {
      전체: localOffers.length,
      검토중: localOffers.filter((o) => o.status === '검토중').length,
      수락함: localOffers.filter((o) => o.status === '수락함').length,
      거절함: localOffers.filter((o) => o.status === '거절함').length,
    }
  }, [localOffers])

  const filtered = useMemo(() => {
    return activeTab === '전체'
      ? localOffers
      : localOffers.filter((o) => o.status === activeTab)
  }, [localOffers, activeTab])

  const updateOfferStatus = (id: number, nextTab: '수락함' | '거절함') => {
    setLocalOffers((prev) => prev.map(o => o.id === id ? { ...o, status: nextTab } : o))
    setActiveTab(nextTab)
    const params = new URLSearchParams(window.location.search)
    params.set("tab", nextTab)
    router.replace(`?${params.toString()}`)
  }

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    const params = new URLSearchParams(window.location.search)
    params.set("tab", tab)
    router.replace(`?${params.toString()}`)
  }

  if (loading) return <p className="text-center p-4">로딩 중...</p>
  if (error) return <p className="text-red-500 text-center p-4">{error}</p>

  return (
    <div className="space-y-6">
      <OffersHeader />
      <OffersStats counts={counts} />
      <div className="bg-white rounded-lg shadow-sm p-6">
        <OffersTabs
          activeTab={activeTab}
          onTabChange={handleTabChange}
          counts={counts}
        />
        <div className="mt-4 flex justify-end">
          <OffersFilter />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {filtered.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onActionComplete={(nextTab) => updateOfferStatus(offer.id, nextTab)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
