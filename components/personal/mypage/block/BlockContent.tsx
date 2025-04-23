"use client";

import { useEffect, useState } from "react";
import { BlockHeader } from "./BlockHeader";
import { BlockControls } from "./BlockControls";
import { BlockedCompaniesList } from "./BlockedCompaniesList";
import { BlockCompanyModal } from "./BlockCompanyModal";
import { useUserStore } from "@/store/useUserStore";
import { apiClient } from "@/api/apiClient";
import { BlockedCompanyProps } from "@/types/block";

export function BlockContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blockedCompanies, setBlockedCompanies] = useState<
    BlockedCompanyProps[]
  >([]);
  const [count, setCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 차단된 기업 목록을 가져오는 함수
  const fetchBlockedCompanies = async () => {
    try {
      const { data } = await apiClient.get("/api/personal/companyblock/list");
      setBlockedCompanies(data.data);
      setCount(data.count);
    } catch (error) {
      console.error("차단 기업 목록 조회 실패:", error);
    }
  };

  useEffect(() => {
    fetchBlockedCompanies();
  }, []);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <BlockHeader />
      <BlockControls count={count} />
      <BlockedCompaniesList
        searchQuery={searchQuery}
        onSearch={setSearchQuery}
        blockedCompanies={blockedCompanies}
        setIsModalOpen={setIsModalOpen}
        fetchBlockedCompanies={fetchBlockedCompanies}
      />

      {isModalOpen && (
        <BlockCompanyModal
          onClose={() => setIsModalOpen(false)}
          fetchBlockedCompanies={fetchBlockedCompanies}
        />
      )}
    </div>
  );
}
