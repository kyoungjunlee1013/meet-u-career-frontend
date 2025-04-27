import { ChevronDown, LayoutGrid } from "lucide-react"

import { useState } from "react";

const DURATION_OPTIONS = [
  { key: "all", label: "전체 기간" },
  { key: "today", label: "오늘" },
  { key: "7days", label: "최근 7일" },
  { key: "month", label: "이번 달" },
];

const SORT_OPTIONS = [
  { key: "recent", label: "최신순" },
  { key: "name", label: "가나다순" },
];

export const ApplicationsFilter = ({ duration, onDurationChange, sort, onSortChange }: {
  duration: string,
  onDurationChange: (key: string) => void,
  sort: string,
  onSortChange: (key: string) => void,
}) => {
  const [openDuration, setOpenDuration] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const selected = DURATION_OPTIONS.find(opt => opt.key === duration) || DURATION_OPTIONS[0];
  const selectedSort = SORT_OPTIONS.find(opt => opt.key === sort) || SORT_OPTIONS[0];
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <button
          type="button"
          className="flex items-center justify-between w-32 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setOpenDuration(v => !v)}
        >
          <span>{selected.label}</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        {openDuration && (
          <div className="absolute left-0 z-10 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
            {DURATION_OPTIONS.map(opt => (
              <button
                key={opt.key}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${duration === opt.key ? 'bg-gray-100 font-bold' : ''}`}
                onClick={() => { onDurationChange(opt.key); setOpenDuration(false); }}
                type="button"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="relative">
        <button
          type="button"
          className="flex items-center justify-between w-32 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => setOpenSort(v => !v)}
        >
          <span>{selectedSort.label}</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        {openSort && (
          <div className="absolute left-0 z-10 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt.key}
                className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${sort === opt.key ? 'bg-gray-100 font-bold' : ''}`}
                onClick={() => { onSortChange(opt.key); setOpenSort(false); }}
                type="button"
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
