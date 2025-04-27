import React from "react";

interface AdBadgeProps {
  isAdvertised?: boolean;
  adType?: 1 | 2 | 3;
  adStartDate?: string;
  adEndDate?: string;
  className?: string;
}

export function AdBadge({ isAdvertised, adType, adStartDate, adEndDate, className = "" }: AdBadgeProps) {
  if (!(isAdvertised && adType && adStartDate && adEndDate)) return null;

  let badgeColor = "bg-blue-50 text-blue-700 border-blue-200";
  let typeLabel = "BASIC";
  if (adType === 2) {
    badgeColor = "bg-green-50 text-green-700 border-green-200";
    typeLabel = "STANDARD";
  } else if (adType === 3) {
    badgeColor = "bg-red-50 text-red-700 border-red-200";
    typeLabel = "PREMIUM";
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${badgeColor} ${className}`}
    >
      {typeLabel} | {adStartDate.slice(0, 10)} ~ {adEndDate.slice(0, 10)}
    </span>
  );
}
