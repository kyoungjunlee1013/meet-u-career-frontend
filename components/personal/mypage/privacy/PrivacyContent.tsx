"use client"

import { useState } from "react";
import { PrivacyHeader } from "./PrivacyHeader";
import { PrivacyControls } from "./PrivacyControls";
import { BlockedCompaniesList } from "./BlockedCompaniesList";

export function PrivacyContent() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <PrivacyHeader />
      <PrivacyControls />
      {/* 하단 중복 버튼 제거됨 */}
      <BlockedCompaniesList searchQuery={searchQuery} onSearch={setSearchQuery} />
    </div>
  );
}
