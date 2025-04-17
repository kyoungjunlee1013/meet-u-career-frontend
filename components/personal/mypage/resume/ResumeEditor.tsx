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

export interface ResumeSection {
  id: string
  title: string
  sectionType: number
  isActive: boolean
  content: any
}

export interface ResumeData {
  title: string
  status: number
  resumeType: number
  location?: string
  desiredPosition?: string
  desiredSalary?: string
  skills?: string[]
  externalLinks?: string[]
  resumeFileKey?: string
  resumeFileName?: string
  resumeUrl?: string
}

export function ResumeEditor({
  resumeType = "direct",
  resumeId,
  isEditMode = false,
}: { resumeType: string; resumeId?: string; isEditMode?: boolean }) {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()

  // Convert resumeType string to number
  const resumeTypeNum = resumeType === "file" ? 1 : resumeType === "url" ? 2 : 0

  // State for resume data
  const [resumeData, setResumeData] = useState<ResumeData>({
    title: "",
    status: 1, // Default to private
    resumeType: resumeTypeNum,
    location: "",
    desiredPosition: "",
    desiredSalary: "",
    skills: [],
    externalLinks: [],
  })

  // State for resume sections
  const [sections, setSections] = useState<ResumeSection[]>([
    {
      id: "education",
      title: "학력",
      sectionType: 0,
      isActive: true,
      content: [],
    },
    {
      id: "experience",
      title: "경력",
      sectionType: 1,
      isActive: resumeTypeNum === 0,
      content: [],
    },
    {
      id: "certifications",
      title: "자격증",
      sectionType: 2,
      isActive: resumeTypeNum === 0,
      content: [],
    },
    {
      id: "activities",
      title: "활동/경험",
      sectionType: 3,
      isActive: resumeTypeNum === 0,
      content: [],
    },
    {
      id: "portfolio",
      title: "포트폴리오",
      sectionType: 4,
      isActive: resumeTypeNum === 0,
      content: [],
    },
    {
      id: "coverLetter",
      title: "자기소개서",
      sectionType: 5,
      isActive: resumeTypeNum === 0,
      content: { selectedCoverLetterId: null, selectedCoverLetterTitle: null },
    },
  ])

  // State for add section modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Handle save resume
  const handleSaveResume = useCallback(async () => {
    // Validate required fields
    if (!resumeData.title) {
      toast({
        title: "필수 항목을 입력해주세요",
        description: "이력서 제목은 필수 항목입니다.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call to save the resume
    // For now, we'll just simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: isEditMode ? "이력서가 수정되었습니다!" : "이력서가 저장되었습니다!",
      description: isEditMode ? "이력서가 성공적으로 수정되었습니다." : "이력서가 성공적으로 저장되었습니다.",
    })

    // Redirect to resume list page after saving
    setTimeout(() => {
      router.push("/personal/mypage/resume")
    }, 2000)
  }, [resumeData.title, isEditMode, router, toast])

  // Load resume data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      // Simulate API call to fetch resume data
      const fetchResumeData = async () => {
        // In a real app, this would be an API call
        // For now, we'll just simulate a delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock data for demonstration
        setResumeData({
          title: "백엔드 개발자 이력서",
          status: 2, // Public
          resumeType: resumeTypeNum,
          location: "서울시 강남구",
          desiredPosition: "백엔드 개발자",
          desiredSalary: "5000만원",
          skills: ["Java", "Spring", "MySQL", "AWS"],
          externalLinks: ["https://github.com/username"],
          resumeFileKey: resumeTypeNum === 1 ? "resume-file-key" : undefined,
          resumeFileName: resumeTypeNum === 1 ? "resume.pdf" : undefined,
          resumeUrl: resumeTypeNum === 2 ? "https://resume.com/myresume" : undefined,
        })

        // Mock sections data
        setSections((prevSections) => {
          return prevSections.map((section) => {
            if (section.id === "education") {
              return {
                ...section,
                content: [
                  {
                    id: "edu1",
                    school: "서울대학교",
                    major: "컴퓨터공학과",
                    degree: "학사",
                    startDate: "2018-03",
                    endDate: "2022-02",
                    isAttending: false,
                    description: "컴퓨터 공학 전공, GPA 4.0/4.5",
                  },
                ],
              }
            }
            if (section.id === "experience") {
              return {
                ...section,
                content: [
                  {
                    id: "exp1",
                    company: "ABC 기술",
                    department: "개발팀",
                    position: "백엔드 개발자",
                    startDate: "2022-03",
                    endDate: "",
                    isCurrentlyWorking: true,
                    description: "Spring Boot를 활용한 RESTful API 개발, 데이터베이스 설계 및 최적화",
                  },
                ],
              }
            }
            return section
          })
        })
      }

      fetchResumeData()
    }
  }, [isEditMode, resumeTypeNum])

  // Handle save keyboard shortcut
  useEffect(() => {
    const handleSaveShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault()
        handleSaveResume()
      }
    }

    window.addEventListener("keydown", handleSaveShortcut)
    return () => window.removeEventListener("keydown", handleSaveShortcut)
  }, [resumeData, sections, handleSaveResume])

  // Handle section toggle
  const handleSectionToggle = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) => (section.id === sectionId ? { ...section, isActive: !section.isActive } : section)),
    )
  }

  // Handle section reorder
  const handleSectionReorder = (reorderedSections: ResumeSection[]) => {
    setSections(reorderedSections)
  }

  // Handle section content update
  const handleSectionContentUpdate = (sectionId: string, content: any) => {
    setSections((prevSections) =>
      prevSections.map((section) => (section.id === sectionId ? { ...section, content } : section)),
    )
  }

  // Handle add new section
  const handleAddSection = (newSection: ResumeSection) => {
    setSections((prevSections) => [...prevSections, newSection])
    setIsAddModalOpen(false)
  }

  // Get active sections
  const activeSections = sections.filter((section) => section.isActive)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">{isEditMode ? "이력서 수정" : "이력서 작성"}</h1>

      <ResumeBasicInfoCard resumeData={resumeData} setResumeData={setResumeData} />

      {isMobile ? (
        <Tabs defaultValue="editor" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="editor">작성</TabsTrigger>
            <TabsTrigger value="manager">항목 관리</TabsTrigger>
          </TabsList>
          <TabsContent value="editor" className="mt-4">
            <ResumeSectionEditorList sections={activeSections} onSectionContentUpdate={handleSectionContentUpdate} />
          </TabsContent>
          <TabsContent value="manager" className="mt-4">
            <ResumeSectionManagerPanel
              sections={sections}
              onSectionToggle={handleSectionToggle}
              onSectionReorder={handleSectionReorder}
              onAddSectionClick={() => setIsAddModalOpen(true)}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-7/10 lg:w-7/10">
            <ResumeSectionEditorList sections={activeSections} onSectionContentUpdate={handleSectionContentUpdate} />
          </div>
          <div className="w-full md:w-3/10 lg:w-3/10">
            <div className="sticky top-20">
              <ResumeSectionManagerPanel
                sections={sections}
                onSectionToggle={handleSectionToggle}
                onSectionReorder={handleSectionReorder}
                onAddSectionClick={() => setIsAddModalOpen(true)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-10">
        <SaveButton onClick={handleSaveResume} isEditMode={isEditMode} />
      </div>

      {isAddModalOpen && (
        <ResumeSectionAddModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddSection}
        />
      )}
    </div>
  )
}
