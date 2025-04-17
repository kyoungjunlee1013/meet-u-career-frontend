import { ApplicationsHeader } from "./ApplicationsHeader"
import { ApplicationsStats } from "./ApplicationsStats"
import { ApplicationsTabs } from "./ApplicationsTabs"
import { ApplicationsSearch } from "./ApplicationsSearch"
import { ApplicationsFilter } from "./ApplicationsFilter"
import { ApplicationsTable } from "./ApplicationsTable"
import { ApplicationsPagination } from "./ApplicationsPagination"

export const ApplicationsContent = () => {
  return (
    <div className="space-y-6">
      <ApplicationsHeader />
      <ApplicationsStats />
      <div className="bg-white rounded-lg shadow-sm p-6">
        <ApplicationsTabs />
        <div className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <ApplicationsSearch />
            <ApplicationsFilter />
          </div>
          <ApplicationsTable />
          <ApplicationsPagination />
        </div>
      </div>
    </div>
  )
}
