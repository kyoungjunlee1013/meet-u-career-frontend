"use client"

import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInfoTab from "./tabs/PersonalInfoTab"
import SecurityTab from "./tabs/SecurityTab"
import NotificationsTab from "./tabs/NotificationsTab"

interface ProfileTabsProps {
  isEditing: boolean
  setIsEditing: (value: boolean) => void
  activeTab: string
  setActiveTab: (value: string) => void
}

export default function ProfileTabs({ isEditing, setIsEditing, activeTab, setActiveTab }: ProfileTabsProps) {
  return (
    <>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>프로필 관리</CardTitle>
            <CardDescription>개인 정보 및 계정 설정을 관리합니다</CardDescription>
          </div>
          {activeTab === "personal" && (
            <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "default" : "outline"}>
              {isEditing ? "취소" : "편집"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="personal" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="personal">개인 정보</TabsTrigger>
            <TabsTrigger value="security">보안</TabsTrigger>
            <TabsTrigger value="notifications">알림 설정</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoTab isEditing={isEditing} />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </>
  )
}
