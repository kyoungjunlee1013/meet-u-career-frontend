"use client";

import { KeywordStats } from "@/types/dashboard";
import { Tooltip as ReactTooltip } from "react-tooltip";

interface PopularKeywordsProps {
  data: KeywordStats[];
}

export function PopularKeywords({ data }: PopularKeywordsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium">인기 채용 키워드</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {data.map((keyword) => (
          <div
            key={keyword.keyword}
            className="bg-gray-50 p-4 rounded-lg"
            data-tooltip-id={`tooltip-${keyword.keyword}`}
          >
            <h4 className="font-medium truncate" style={{ maxWidth: "150px" }}>
              {keyword.keyword}
            </h4>
            <p className="text-sm text-gray-500 mt-1">{keyword.count}</p>

            {/* Tooltip */}
            <ReactTooltip id={`tooltip-${keyword.keyword}`} place="top">
              {keyword.keyword}
            </ReactTooltip>
          </div>
        ))}
      </div>
    </div>
  );
}
