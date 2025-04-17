"use client"

import { useState } from "react"
import { PrivacyHeader } from "./PrivacyHeader"
import { PrivacyStats } from "./PrivacyStats"
import { PrivacyControls } from "./PrivacyControls"
import { BlockedCompaniesList } from "./BlockedCompaniesList"

export function PrivacyContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8">
      <PrivacyHeader />
      <PrivacyStats />
      <PrivacyControls />
      <BlockedCompaniesList searchQuery={searchQuery} onSearch={handleSearch} />
    </div>
  )
}
