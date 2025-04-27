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

        {selectedJobPostingId ? (
          <ApplicantsTableWithSearch jobPostingId={selectedJobPostingId} />
        ) : (
          <div className="mt-10 text-center text-gray-500 text-sm border border-gray-200 rounded-md py-10 bg-white">
            채용공고를 먼저 선택해 주세요.
          </div>
        )}
      </main>
    </div>
  );
};
