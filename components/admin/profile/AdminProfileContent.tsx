"use client"

import { useState } from "react"
import ProfileSidebar from "./ProfileSidebar"
import ProfileTabs from "./ProfileTabs"
import { Card } from "@/components/ui/card"

export default function AdminProfileContent() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left sidebar with profile photo */}
        <div className="w-full md:w-1/4">
          <ProfileSidebar />
        </div>

        {/* Right content area with tabs */}
        <div className="w-full md:w-3/4">
          <Card>
            <ProfileTabs
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
