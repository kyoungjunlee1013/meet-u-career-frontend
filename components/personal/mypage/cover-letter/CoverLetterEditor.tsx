"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { CoverLetterBasicInfoCard } from "./CoverLetterBasicInfoCard"
import { CoachingSectionEditor } from "../../coaching/CoachingSectionEditor"
import { CoverLetterContentEditorList } from "./CoverLetterContentEditorList"
import { CoverLetterSectionAddModal } from "./CoverLetterSectionAddModal"
import { SaveButton } from "./SaveButton"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd"
import { ConfettiCelebration } from "./ConfettiCelebration"
import { CelebrationOverlay } from "@/components/common";

export interface CoverLetterSection {
  id: string; // 항상 string (DB PK든 임시든)
  sectionTitle: string;
  content: string;
  contentId?: number; // 서버에 전송할 때는 id로 변환해서 보냄
  originalContent?: string;
  feedback?: string;
  revisedContent?: string;
  isApplied?: boolean;
  appliedAt?: string;
  isLoading?: boolean;
  error?: string;
}

export interface CoverLetterData {
  id?: string
  title: string
  status: number // 0: 작성 중, 1: 임시저장, 2: 삭제
}

function generateSectionId() {
  // 새 section 추가 시 항상 string 타입의 임시 id를 생성
  return String(Date.now());
}

import { CoverLetterPreviewModal } from "./CoverLetterPreviewModal";

export function CoverLetterEditor({ id, isEditMode }: { id?: string | null; isEditMode: boolean }) {
  const router = useRouter()
  const { toast } = useToast()
  const isMobile = useMobile()
  const [isLoading, setIsLoading] = useState(isEditMode)
  const [isSaving, setIsSaving] = useState(false)
  const [saveProgress, setSaveProgress] = useState(0)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false);

  // State for cover letter data
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    title: "",
    status: 0, // Default to 작성 중
  })

  // SSR-safe: 최초 section id를 고정값으로 설정 (4개 기본 항목)
  const defaultSections: CoverLetterSection[] = [
    { id: "section-1", sectionTitle: "성장 과정", content: "" },
    { id: "section-2", sectionTitle: "성격의 장단점 및 보완 노력", content: "" },
    { id: "section-3", sectionTitle: "지원 동기", content: "" },
    { id: "section-4", sectionTitle: "입사 후 포부", content: "" },
  ];
  const [sections, setSections] = useState<CoverLetterSection[]>(defaultSections);

  // 활성 탭 상태
  const [activeSectionId, setActiveSectionId] = useState<string>(defaultSections[0].id);

  // State for add section modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // 저장 함수 (state 선언 이후 위치)
  const handleSave = useCallback(async () => {
  if (!coverLetterData.title.trim()) {
    toast({ title: "제목을 입력해주세요.", variant: "destructive" });
    return;
  }
  if (sections.length === 0 || sections.some(s => !s.sectionTitle.trim())) {
    toast({ title: "모든 항목의 제목을 입력해주세요.", variant: "destructive" });
    return;
  }
  if (sections.some(s => !s.content.trim())) {
    toast({ title: "모든 항목의 본문을 입력해주세요.", variant: "destructive" });
    return;
  }
  setIsSaving(true);
  setSaveProgress(0);
  try {
    let res, json;
    if (isEditMode && id) {
      // 수정 API 호출
      res = await fetch(`/api/personal/coverletter/edit/${id}`, {
        method: "POST", // 또는 PATCH, 서버에 맞게 조정
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: coverLetterData.title,
          contents: sections.map((s, idx) => ({
  sectionTitle: s.sectionTitle,
  content: s.content,
  contentOrder: idx + 1,
  ...(s.contentId ? { id: s.contentId } : {}),
})),
        }),
      });
      setSaveProgress(80);
      json = await res.json();
      setSaveProgress(100);
      if (!res.ok || !json.data) throw new Error(json.message || "수정에 실패했습니다.");
      toast({ title: "자기소개서가 성공적으로 수정되었습니다!", variant: "default" });
    } else {
      // 신규 작성 API 호출
      res = await fetch("/api/personal/coverletter/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: coverLetterData.title,
          contents: sections.map((s, idx) => ({
  sectionTitle: s.sectionTitle,
  content: s.content,
  contentOrder: idx + 1,
  ...(s.contentId ? { id: s.contentId } : {}),
})),
        }),
      });
      setSaveProgress(80);
      json = await res.json();
      setSaveProgress(100);
      if (!res.ok || !json.data) throw new Error(json.message || "저장에 실패했습니다.");
      toast({ title: "자기소개서가 성공적으로 저장되었습니다!", variant: "default" });
    }
    setShowCelebration(true);
    setTimeout(() => {
      setShowCelebration(false);
      router.push("/personal/mypage/cover-letter");
    }, 1600);
  } catch (err: any) {
    toast({ title: err.message || (isEditMode ? "수정 중 오류가 발생했습니다." : "저장 중 오류가 발생했습니다."), variant: "destructive" });
  } finally {
    setIsSaving(false);
    setTimeout(() => setSaveProgress(0), 800);
  }
}, [coverLetterData.title, sections, toast, isEditMode, id]);

  // Load cover letter data if in edit mode
  useEffect(() => {
    if (isEditMode && id) {
      // Simulate API call to fetch cover letter data
      const fetchCoverLetterData = async () => {
  try {
    setIsLoading(true);
    const res = await fetch(`/api/personal/coverletter/view?id=${id}`);
    if (!res.ok) throw new Error('서버 응답 오류');
    const json = await res.json();
    if (json && json.data) {
      setCoverLetterData({
        id: json.data.id,
        title: json.data.title,
        status: json.data.status ?? 0,
      });
      // 섹션 데이터 변환 (sectionTitle, content, id)
      const sectionList = (json.data.sections || []).map((s: any) => ({
  id: String(s.id), // 항상 string, idx fallback 제거
  sectionTitle: s.sectionTitle || s.title || "",
  content: s.content || "",
  contentId: s.id,
}));
      setSections(sectionList.length > 0 ? sectionList : defaultSections);
      setActiveSectionId(sectionList[0]?.id || defaultSections[0].id);
    } else {
      toast({ title: '데이터를 불러올 수 없습니다.', variant: 'destructive' });
    }
  } catch (err: any) {
    toast({ title: err.message || '상세 데이터를 불러오지 못했습니다.', variant: 'destructive' });
  } finally {
    setIsLoading(false);
  }
}
fetchCoverLetterData()
    }
  }, [id, isEditMode])

  // 실제 항목 추가 핸들러 구현
  const handleAddSection = (sectionTitle: string) => {
    setSections(prev => {
      const newId = generateSectionId(); // 인자 없이 호출
      setActiveSectionId(newId);
      return [
        ...prev,
        { id: newId, sectionTitle, content: "" }
      ];
    });
    setIsAddModalOpen(false);
  };

  // 항목 순서 변경 핸들러
  const handleSectionReorder = (newSections: CoverLetterSection[]) => {
    setSections(newSections);
  };

  // 항목 삭제 핸들러
  const handleDeleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
    // 삭제 후, activeSectionId가 삭제된 항목이면 첫 번째 항목으로 이동
    setActiveSectionId(prevActive => {
      if (prevActive === id) {
        const next = sections.find(s => s.id !== id);
        return next ? next.id : "";
      }
      return prevActive;
    });
  };

  // 항목 내용 업데이트 핸들러
  const handleSectionContentUpdate = (sectionId: string, field: keyof CoverLetterSection, value: string) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, [field]: value } : s
    ));
  };

  // AI 피드백 요청 핸들러 (섹션별, 실제 API 연동)
  const handleAIFeedback = async (sectionId: string) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId ? { ...s, isLoading: true, feedback: undefined, revisedContent: undefined, error: undefined } : s
    ));
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;
    try {
      const res = await fetch(`/api/personal/coverletter/coaching`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: section.content, sectionTitle: section.sectionTitle }),
      });
      const json = await res.json();
      const data = json.data || {};
      setSections(prev =>
        prev.map(s =>
          s.id === sectionId
            ? {
                ...s,
                isLoading: false,
                feedback: data.feedback || "AI 피드백을 받아왔습니다.",
                revisedContent: data.revisedContent || "AI가 제안한 수정 예시입니다.",
                error: undefined,
              }
            : s
        )
      );
    } catch (err: any) {
      setSections(prev => prev.map(s =>
        s.id === sectionId
          ? {
              ...s,
              isLoading: false,
              feedback: undefined,
              revisedContent: undefined,
              error: err.message || "AI 코칭 요청 중 오류가 발생했습니다.",
            }
          : s
      ));
    }
  };

  // AI 수정안 적용 핸들러 (revisedContent → content)
  const handleApplyRevisedContent = (sectionId: string) => {
    setSections(prev => prev.map(s =>
      s.id === sectionId && s.revisedContent
        ? { ...s, content: s.revisedContent }
        : s
    ));
  };


  return (
    <>
      {/* 저장 축하 애니메이션 오버레이 */}
      <CelebrationOverlay show={showCelebration}>
        <ConfettiCelebration run={showCelebration} />
      </CelebrationOverlay>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">{isEditMode ? "자기소개서 수정" : "자기소개서 작성"}</h1>
        <CoverLetterBasicInfoCard coverLetterData={coverLetterData} setCoverLetterData={setCoverLetterData} />
        {/* 탭 스타일의 드래그앤드롭 영역 */}
        <DragDropContext
          onDragEnd={(result: DropResult) => {
            if (!result.destination) return;
            const newSections = Array.from(sections);
            const [removed] = newSections.splice(result.source.index, 1);
            newSections.splice(result.destination.index, 0, removed);
            setSections(newSections);
          }}
        >
          <Droppable droppableId="tabs-droppable" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex gap-2 mb-4"
              >
                {sections.map((section, idx) => (
                  <Draggable key={section.id} draggableId={String(section.id)} index={idx}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          userSelect: "none",
                          zIndex: snapshot.isDragging ? 20 : undefined,
                        }}
                        className={`min-w-[100px] px-4 py-2 rounded-t border-b-2 transition font-medium flex items-center relative select-none cursor-pointer
                          ${activeSectionId === section.id ? "bg-white border-blue-500 text-blue-700" : "bg-gray-100 border-transparent text-gray-500 hover:bg-gray-200"}
                          ${snapshot.isDragging ? "ring-2 ring-blue-200" : ""}
                        `}
                        onClick={() => setActiveSectionId(section.id)}
                      >
                        <span
                          {...provided.dragHandleProps}
                          className="truncate max-w-[90px] cursor-grab active:cursor-grabbing"
                        >
                          {section.sectionTitle}
                        </span>
                        {/* X 버튼 */}
                        <span
                          onClick={e => {
                            if (sections.length === 1) return;
                            e.stopPropagation();
                            toast({
                              title: '정말 삭제하시겠습니까?',
                              description: '이 항목은 복구할 수 없습니다.',
                              variant: 'destructive',
                              action: (
                                <button
                                  className="ml-4 px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                                  onClick={() => handleDeleteSection(section.id)}
                                >
                                  삭제
                                </button>
                              ),
                            });
                          }}
                          className={`ml-2 text-lg ${sections.length === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-300 hover:text-red-500 cursor-pointer'}`}
                          title={sections.length === 1 ? '최소 1개 항목은 남겨야 합니다.' : '삭제'}
                          aria-disabled={sections.length === 1}
                        >
                          ×
                        </span>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                {/* + 버튼 */}
                <button
                  type="button"
                  className="ml-2 px-2 py-1 text-base rounded bg-blue-100 text-blue-700 hover:bg-blue-200"
                  onClick={() => {
                    if (sections.length >= 8) {
                      toast({
                        title: "최대 8개 항목까지 추가할 수 있습니다.",
                        variant: "destructive",
                      });
                      return;
                    }
                    setIsAddModalOpen(true);
                  }}
                  disabled={sections.length >= 8}
                >
                  +
                </button>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {/* 선택된 탭(섹션)만 내용 표시 */}
        <CoverLetterContentEditorList
          sections={sections.filter(s => s.id === activeSectionId)}
          onSectionContentUpdate={handleSectionContentUpdate}
          onRequestFeedback={handleAIFeedback}
          onApplyFeedback={handleApplyRevisedContent}
        />
      </div>
      {/* 항목 추가 모달 */}
      <CoverLetterSectionAddModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddSection}
      />
      {/* 전체 미리보기 모달 */}
      <CoverLetterPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        coverLetter={{
          title: coverLetterData.title,
          sections: sections.map(s => ({ title: s.sectionTitle, content: s.content })),
          updatedAt: new Date(),
        }}
      />
      <div className="flex flex-col md:flex-row justify-end pt-6 gap-3">
        <SaveButton
          onClick={handleSave}
          isEditMode={isEditMode}
          isSaving={isSaving}
          progress={saveProgress}
        />
        <button
          type="button"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 shadow"
          onClick={() => setIsPreviewOpen(true)}
        >
          한 번에 보기
        </button>
      </div>
    </>
  );
}



