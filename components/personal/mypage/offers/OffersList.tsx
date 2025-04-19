interface Offer {
  id: number;
  company: string;
  position: string;
  location: string;
  deadline: string;
  description: string;
  status: string;
}

interface OffersListProps {
  offers: Offer[];
}

import { OfferCard } from "./OfferCard"

export function OffersList({ offers }: OffersListProps) {
  if (!offers || !Array.isArray(offers) || offers.length === 0) {
    return <div className="text-center text-gray-400 py-8">해당 상태의 제안이 없습니다.</div>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {offers.map((offer) => (
        <div key={offer.id}>
          <OfferCard offer={offer} />
        </div>
      ))}
    </div>
  );
}
