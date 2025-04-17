"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type ApplicantStatus, getMockApplicant } from "./types"
import { ApplicantDetailHeader } from "./ApplicantDetailHeader"
import { BasicInfoCard } from "./BasicInfoCard"
import { ProfilePhotoCard } from "./ProfilePhotoCard"
import { StatusManagementCard } from "./StatusManagementCard"
import { NotesCard } from "./NotesCard"
import { ResumeContent } from "./ResumeContent"
import { CoverLetterContent } from "./CoverLetterContent"
import { DocumentsContent } from "./DocumentsContent"

interface ApplicantDetailProps {
  applicantId: string
}

export default function ApplicantDetail({ applicantId }: ApplicantDetailProps) {
  const applicant = getMockApplicant(applicantId)
  const [status, setStatus] = useState<ApplicantStatus>(applicant.status)

  return (
    <div className="space-y-6">
      <ApplicantDetailHeader />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <BasicInfoCard applicant={applicant} status={status} />

          <Tabs defaultValue="resume">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="resume">이력서</TabsTrigger>
              <TabsTrigger value="coverLetter">자기소개서</TabsTrigger>
              <TabsTrigger value="documents">첨부 서류</TabsTrigger>
            </TabsList>

            <TabsContent value="resume">
              <ResumeContent applicant={applicant} />
            </TabsContent>

            <TabsContent value="coverLetter">
              <CoverLetterContent coverLetter={applicant.coverLetter} />
            </TabsContent>

            <TabsContent value="documents">
              <DocumentsContent />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <ProfilePhotoCard />
          <StatusManagementCard currentStatus={status} onStatusChange={setStatus} />
          <NotesCard />
        </div>
      </div>
    </div>
  )
}
