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

interface OffersListProps {
  offers: Offer[]
  onActionComplete?: (nextTab: '수락함' | '거절함') => void // ✅ 반드시 있어야 함!
}

export function OffersList({ offers, onActionComplete }: OffersListProps) {
  if (!offers || !Array.isArray(offers) || offers.length === 0) {
    return <div className="text-center text-gray-400 py-8">해당 상태의 제안이 없습니다.</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onActionComplete={onActionComplete} // ✅ 전달
        />
      ))}
    </div>
  )
}
