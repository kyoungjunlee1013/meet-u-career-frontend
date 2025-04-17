import { OffersHeader } from "./OffersHeader"
import { OffersStats } from "./OffersStats"
import { OffersTabs } from "./OffersTabs"
import { OffersFilter } from "./OffersFilter"
import { OffersList } from "./OffersList"

export function OffersContent() {
  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <OffersHeader />
      <OffersStats />
      <OffersTabs />
      <div className="mt-4 flex justify-end">
        <OffersFilter />
      </div>
      <OffersList />
    </div>
  )
}
