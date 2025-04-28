"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { ResumeBasicInfoCard } from "./ResumeBasicInfoCard"
import { ResumeSectionEditorList } from "./ResumeSectionEditorList"
import { ResumeSectionManagerPanel } from "./ResumeSectionManagerPanel"
import { ResumeSectionAddModal } from "./ResumeSectionAddModal"
import { SaveButton } from "./SaveButton"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { ConfettiCelebration } from "./ConfettiCelebration"
import { CelebrationOverlay } from "@/components/common";
import { apiClient } from "@/api/apiClient";

export interface ResumeSection {
  id: string;
  title: string;
  sectionType: number;
  isActive: boolean;
  content: any;
}

export interface ResumeData {
  id?: number;
  profileId?: number;
  title: string;
  createdAt?: string;
  status: number;
  resumeType: number;
  name: string;
  email: string;
  phone: string;
  profileImage?: string | File;
  profileImageKey?: string;
  profileImageName?: string;
  profileImageType?: string;
  // locationId, desiredJobCategoryId 등은 제외
  overview: string;
  skills?: string[];
  extraLink1?: string;
  extraLink2?: string;
  resumeFile?: File;
  resumeFileKey?: string;
  resumeFileName?: string;
  resumeFileType?: string;
  resumeUrl?: string;
  sections?: ResumeSection[];
}

interface Profile {
  profileId: number;
  accountId: number;
  name: string;
  email: string;
  phone: string;
  profileImageKey?: string;
  desiredJobCategoryName?: string | null;
  skills?: string;
}

export default function ResumeEditor({ ...props }) {
  // ...생략된 상태/로직
  // 저장 함수
  const handleSaveResume = async () => {
    try {
      // dto 생성: locationId, desiredJobCategoryId 등은 제외
      const { locationId, desiredJobCategoryId, ...dto } = resumeData;
      const formData = new FormData();
      formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
      if (resumeData.resumeFile) {
        formData.append("file", resumeData.resumeFile);
      }
      await apiClient.post("/api/personal/mypage/resume/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast({ description: "이력서가 성공적으로 저장되었습니다." });
      // 기타 후처리
    } catch (err) {
      toast({ description: "이력서 저장 중 오류가 발생했습니다.", variant: "destructive" });
      console.error(err);
    }
  };
  // ...생략된 렌더링/JSX
}
