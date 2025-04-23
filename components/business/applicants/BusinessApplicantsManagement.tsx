"use client";

import { useState } from "react";
import { BusinessHeader } from "@/components/business/layout/BusinessHeader";
import { ApplicantsHeader } from "./ApplicantsHeader";
import { JobPostingCard } from "./JobPostingCard";
import { ApplicantsTableWithSearch } from "./ApplicantsTableWithSearch";

export const BusinessApplicantsManagement = () => {
  const [selectedJobPostingId, setSelectedJobPostingId] = useState<
    number | null
  >(null);

  return (
    <div className="flex min-h-screen flex-col">
      <BusinessHeader />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6">
        <ApplicantsHeader />
        <JobPostingCard onSelectJob={setSelectedJobPostingId} />
        {selectedJobPostingId && (
          <ApplicantsTableWithSearch jobPostingId={selectedJobPostingId} />
        )}
      </main>
    </div>
  );
};
