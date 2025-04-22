import { JobsHeader } from "./JobsHeader"
// import { JobsFilter } from "./JobsFilter"
import { JobsList } from "./JobsList"
import { Pagination } from "./Pagination"

export const JobsContent = () => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      <JobsHeader />
      {/* <JobsFilter /> */}
      <JobsList />
      {/* <Pagination /> */}
    </div>
  )
}
