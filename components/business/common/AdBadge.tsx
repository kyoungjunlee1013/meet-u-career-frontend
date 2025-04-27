import React from "react";

interface AdBadgeProps {
  adType: 1 | 2 | 3;
  period: number; // 광고 기간(일)
}

const typeLabelMap: Record<1 | 2 | 3, string> = {
  1: "BASIC",
  2: "STANDARD",
  3: "PREMIUM",
};
const typeColorMap: Record<1 | 2 | 3, string> = {
  1: "bg-blue-50 text-blue-700 border-blue-200",
  2: "bg-green-50 text-green-700 border-green-200",
  3: "bg-red-50 text-red-700 border-red-200",
};

export const AdBadge: React.FC<AdBadgeProps> = ({ adType, period }) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold border ${typeColorMap[adType]}`}
    >
      {typeLabelMap[adType]} | {period}일
    </span>
  );
};
