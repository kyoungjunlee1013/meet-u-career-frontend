"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { CoverLetterBasicInfoCard } from "./CoverLetterBasicInfoCard"
import { CoverLetterContentEditorList } from "./CoverLetterContentEditorList"
import { CoverLetterSectionManagerPanel } from "./CoverLetterSectionManagerPanel"
import { CoverLetterSectionAddModal } from "./CoverLetterSectionAddModal"
import { SaveButton } from "./SaveButton"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export interface CoverLetterSection {
  id: string
  sectionTitle: string
  content: string
  originalContent?: string
  feedback?: string
  revisedContent?: string
  isApplied?: boolean
  appliedAt?: string
}

export interface CoverLetterData {
  id?: string
  title: string
  status: number // 0: 작성 중, 1: 임시저장, 2: 삭제
}

function generateSectionId(sections: CoverLetterSection[]) {
  // section-1, section-2, ... 중복 없이 생성
  let max = 1;
  sections.forEach(s => {
    const n = Number(s.id.replace('section-', ''));
    if (!isNaN(n) && n >= max) max = n + 1;
  });
  return `section-${max}`;
}

export function CoverLetterEditor({ id, isEditMode }: { id?: string | null; isEditMode: boolean }) {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [isLoading, setIsLoading] = useState(isEditMode)
  const [isSaving, setIsSaving] = useState(false)
  const [saveProgress, setSaveProgress] = useState(0)

  // State for cover letter data
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    title: "",
    status: 0, // Default to 작성 중
  })

  // SSR-safe: 최초 section id를 고정값으로 설정
  const [sections, setSections] = useState<CoverLetterSection[]>([
    {
      id: "section-1",
      sectionTitle: "지원 동기",
      content: "",
    },
  ])

  // State for add section modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Load cover letter data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      // Simulate API call to fetch cover letter data
      const fetchCoverLetterData = async () => {
        // ...
      }
      fetchCoverLetterData()
    }
  }, [id, isEditMode])

  // 실제 항목 추가 핸들러 구현
  const handleAddSection = (sectionTitle: string) => {
    setSections(prev => ([
      ...prev,
      { id: generateSectionId(prev), sectionTitle, content: "" }
    ]));
    setIsAddModalOpen(false);
  };

  // 항목 순서 변경 핸들러
  const handleSectionReorder = (newSections: CoverLetterSection[]) => {
    setSections(newSections);
  };

  // 항목 삭제 핸들러
  const handleDeleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  // 항목 내용 업데이트 핸들러
  const handleSectionContentUpdate = (sectionId: string, field: keyof CoverLetterSection, value: string) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, [field]: value } : s
    ));
  };

  // 이하 기타 핸들러 생략

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 좌측 70%: 상단(제목 입력) + 항목 입력 카드 리스트 */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">{isEditMode ? "자기소개서 수정" : "자기소개서 작성"}</h1>
          <CoverLetterBasicInfoCard coverLetterData={coverLetterData} setCoverLetterData={setCoverLetterData} />
          <CoverLetterContentEditorList
            sections={sections}
            onSectionContentUpdate={handleSectionContentUpdate}
            onRequestFeedback={() => {}}
            onApplyFeedback={() => {}}
          />
        </div>
        {/* 우측 30%: 항목 관리 */}
        <div className="lg:col-span-1">
          <div className="sticky top-20">
            <CoverLetterSectionManagerPanel
              sections={sections}
              onSectionReorder={handleSectionReorder}
              onDeleteSection={handleDeleteSection}
              onAddSectionClick={() => setIsAddModalOpen(true)}
            />
          </div>
        </div>
      </div>
      {/* 항목 추가 모달 */}
      <CoverLetterSectionAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSection}
      />
    </>
  );
}
