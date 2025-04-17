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

  // State for cover letter sections
  const [sections, setSections] = useState<CoverLetterSection[]>([
    {
      id: "section-" + Date.now(),
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
        try {
          setIsLoading(true)
          // In a real app, this would be an API call
          // For now, we'll just simulate a delay
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Mock data for demonstration
          setCoverLetterData({
            id,
            title: "백엔드 개발자 자기소개서",
            status: 1, // 임시저장
          })

          // Mock sections data
          setSections([
            {
              id: "section-1",
              sectionTitle: "지원 동기",
              content:
                "백엔드 개발자로서의 역량을 발휘하고 성장하기 위해 지원하게 되었습니다. 귀사의 기술 스택과 제가 보유한 기술이 일치하여 즉시 기여할 수 있을 것으로 생각합니다.",
              originalContent:
                "백엔드 개발자로서의 역량을 발휘하고 성장하기 위해 지원하게 되었습니다. 귀사의 기술 스택과 제가 보유한 기술이 일치하여 즉시 기여할 수 있을 것으로 생각합니다.",
              feedback: "지원 동기가 명확하게 표현되어 있지만, 조금 더 구체적인 내용이 추가되면 좋을 것 같습니다.",
              revisedContent:
                "백엔드 개발자로서의 역량을 발휘하고 성장하기 위해 지원하게 되었습니다. 특히 귀사에서 사용하는 Spring Boot, Kubernetes 기술 스택에 3년간의 실무 경험을 보유하고 있어 입사 즉시 팀에 기여할 수 있을 것으로 확신합니다.",
              isApplied: false,
            },
            {
              id: "section-2",
              sectionTitle: "직무 관련 경험",
              content:
                "대규모 트래픽을 처리하는 결제 시스템을 설계하고 구현한 경험이 있습니다. 이 과정에서 시스템 장애 대응 및 성능 최적화 경험을 쌓았습니다.",
            },
            {
              id: "section-3",
              sectionTitle: "성장 비전",
              content:
                "지속적인 학습을 통해 기술적 역량을 높이고, 팀원들과의 협업을 통해 함께 성장하는 개발자가 되고자 합니다.",
            },
          ])
        } catch (error) {
          console.error("Error fetching data:", error)
          toast({
            title: "데이터 로드 실패",
            description: "자기소개서 데이터를 불러오는데 실패했습니다.",
            variant: "destructive",
          })
        } finally {
          setIsLoading(false)
        }
      }

      fetchCoverLetterData()
    }
  }, [isEditMode, id, toast])

  // Handle save keyboard shortcut
  useEffect(() => {
    const handleSaveShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        handleSaveCoverLetter()
      }
    }

    window.addEventListener("keydown", handleSaveShortcut)
    return () => window.removeEventListener("keydown", handleSaveShortcut)
  }, [coverLetterData, sections])

  // Handle section content update
  const handleSectionContentUpdate = (sectionId: string, field: keyof CoverLetterSection, value: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => (section.id === sectionId ? { ...section, [field]: value } : section)),
    )
  }

  // Handle add new section
  const handleAddSection = (sectionTitle: string) => {
    const newSection: CoverLetterSection = {
      id: "section-" + Date.now(),
      sectionTitle,
      content: "",
    }
    setSections((prevSections) => [...prevSections, newSection])
    setIsAddModalOpen(false)
  }

  // Handle section delete
  const handleDeleteSection = (sectionId: string) => {
    setSections((prevSections) => prevSections.filter((section) => section.id !== sectionId))
  }

  // Handle section reorder
  const handleSectionReorder = (reorderedSections: CoverLetterSection[]) => {
    setSections(reorderedSections)
  }

  // Handle applying AI feedback
  const handleApplyFeedback = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId && section.revisedContent) {
          return {
            ...section,
            content: section.revisedContent,
            isApplied: true,
            appliedAt: new Date().toISOString(),
          }
        }
        return section
      }),
    )

    toast({
      title: "AI 수정안 적용 완료",
      description: "AI 수정안이 자기소개서에 적용되었습니다.",
    })
  }

  // Handle requesting AI feedback
  const handleRequestFeedback = async (sectionId: string) => {
    // Find the section
    const section = sections.find((s) => s.id === sectionId)
    if (!section || !section.content.trim()) {
      toast({
        title: "피드백 요청 실패",
        description: "내용을 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    try {
      // Save original content
      setSections((prevSections) =>
        prevSections.map((s) => (s.id === sectionId ? { ...s, originalContent: s.content } : s)),
      )

      toast({
        title: "피드백 요청 중...",
        description: "AI가 자기소개서를 분석하고 있습니다.",
      })

      // In a real app, this would be an API call to your AI endpoint
      // For demo purposes, we'll simulate a delay and return mock data
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock AI response
      const feedback =
        "내용이 간결하게 잘 작성되었습니다. 다만, 조금 더 구체적인 경험과 성과를 추가하면 좋을 것 같습니다."
      const revisedContent =
        section.content +
        "\n\n더불어, 해당 역할에서 제가 기여할 수 있는 구체적인 부분으로는 시스템 안정성 향상과 성능 최적화입니다. 이전 프로젝트에서 30% 성능 향상을 이끌어낸 경험을 바탕으로 귀사의 시스템 개선에도 기여하고 싶습니다."

      setSections((prevSections) =>
        prevSections.map((s) => (s.id === sectionId ? { ...s, feedback, revisedContent, isApplied: false } : s)),
      )

      toast({
        title: "피드백 생성 완료",
        description: "AI 피드백이 생성되었습니다.",
      })
    } catch (error) {
      console.error("Error requesting feedback:", error)
      toast({
        title: "피드백 요청 실패",
        description: "AI 피드백을 생성하는데 실패했습니다.",
        variant: "destructive",
      })
    }
  }

  // Handle save cover letter
  const handleSaveCoverLetter = async () => {
    // Validate required fields
    if (!coverLetterData.title) {
      toast({
        title: "저장 실패",
        description: "자기소개서 제목을 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    if (sections.length === 0) {
      toast({
        title: "저장 실패",
        description: "최소 하나 이상의 항목이 필요합니다.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSaving(true)
      setSaveProgress(0)

      // Simulate progressive saving
      const interval = setInterval(() => {
        setSaveProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval)
            return 100
          }
          return prevProgress + 10
        })
      }, 150)

      // In a real app, this would be an API call to save the cover letter
      // For demo purposes, we'll simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      clearInterval(interval)
      setSaveProgress(100)

      toast({
        title: "저장 완료",
        description: "자기소개서가 성공적으로 저장되었습니다.",
      })

      // Redirect to cover letter list page after saving
      setTimeout(() => {
        router.push("/personal/mypage/cover-letter")
      }, 1500)
    } catch (error) {
      console.error("Error saving cover letter:", error)
      toast({
        title: "저장 실패",
        description: "자기소개서를 저장하는데 실패했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <>
      {isMobile ? (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">{isEditMode ? "자기소개서 수정" : "자기소개서 작성"}</h1>
          <CoverLetterBasicInfoCard coverLetterData={coverLetterData} setCoverLetterData={setCoverLetterData} />
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="editor">작성</TabsTrigger>
              <TabsTrigger value="manager">항목 관리</TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="mt-4">
              <CoverLetterContentEditorList
                sections={sections}
                onSectionContentUpdate={handleSectionContentUpdate}
                onRequestFeedback={handleRequestFeedback}
                onApplyFeedback={handleApplyFeedback}
              />
            </TabsContent>
            <TabsContent value="manager" className="mt-4">
              <CoverLetterSectionManagerPanel
                sections={sections}
                onSectionReorder={handleSectionReorder}
                onDeleteSection={handleDeleteSection}
                onAddSectionClick={() => setIsAddModalOpen(true)}
              />
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 좌측 70%: 상단(제목 입력) + 항목 입력 카드 리스트 */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">{isEditMode ? "자기소개서 수정" : "자기소개서 작성"}</h1>
            <CoverLetterBasicInfoCard coverLetterData={coverLetterData} setCoverLetterData={setCoverLetterData} />
            <CoverLetterContentEditorList
              sections={sections}
              onSectionContentUpdate={handleSectionContentUpdate}
              onRequestFeedback={handleRequestFeedback}
              onApplyFeedback={handleApplyFeedback}
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
      )}
      <div className="fixed bottom-6 right-6 z-10">
        <SaveButton
          onClick={handleSaveCoverLetter}
          isEditMode={isEditMode}
          isSaving={isSaving}
          progress={saveProgress}
        />
      </div>
      {isAddModalOpen && (
        <CoverLetterSectionAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddSection}
        />
      )}
    </>
  )
}
