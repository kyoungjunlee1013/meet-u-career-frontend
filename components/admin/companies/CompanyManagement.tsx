"use client";

import { useState } from "react";
import CompanyTabs from "./CompanyTabs";
import CompanySearch from "./CompanySearch";
import CompanyTable from "./CompanyTable";

export default function CompanyManagement() {
  // activeTab을 "all" | "pending" | "approved"로 명시적으로 설정
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved">(
    "all"
  );

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          기업 조회·검수
        </h1>
        <p className="text-gray-600">
          기업 정보를 조회하고 검수 상태를 관리할 수 있습니다.
        </p>
      </div>

      <CompanyTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <CompanySearch />
      <CompanyTable activeTab={activeTab} />
    </div>
  );
}
