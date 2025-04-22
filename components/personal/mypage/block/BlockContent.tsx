"use client"

import { useEffect, useState } from "react";
import { BlockHeader } from "./BlockHeader";
import { BlockControls } from "./BlockControls";
import { BlockedCompaniesList } from "./BlockedCompaniesList";
import axios from "axios"
import { useUserStore } from "@/store/useUserStore";
import { BlockCompanyModal } from "./BlockCompanyModal";
import { BlockedCompanyProps } from "@/types/block";

export function BlockContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [blockedCompanies, setBlockedCompanies] = useState<BlockedCompanyProps[]>([]);
  const [count, setCount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 차단된 기업 목록을 가져오는 함수
  const fetchBlockedCompanies = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      const headers = token && useUserStore.getState().isLocalhost ? { "Authorization": `Bearer ${token}` } : {};

      const response = await axios.get("/api/personal/companyblock/list", { headers });

      setBlockedCompanies(response.data.data);
      setCount(response.data.count);
    } catch (error) {
      console.error("차단 기업 목록 조회 실패:", error)
    }
  }

  useEffect(() => {
    fetchBlockedCompanies();
  }, [])

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
