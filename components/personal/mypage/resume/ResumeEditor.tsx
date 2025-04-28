"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ResumeBasicInfoCard } from "./ResumeBasicInfoCard";
import { ResumeSectionEditorList } from "./ResumeSectionEditorList";
import { ResumeSectionManagerPanel } from "./ResumeSectionManagerPanel";
import { ResumeSectionAddModal } from "./ResumeSectionAddModal";
import { SaveButton } from "./SaveButton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import { ConfettiCelebration } from "./ConfettiCelebration";
import { CelebrationOverlay } from "@/components/common";
import { apiClient } from "@/api/apiClient";

// 기존 ResumeSection 타입(섹션 에디터 내부용)
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

  // account/profile 기반 정보
  name: string;
  email: string;
  phone: string;
  profileImage?: string | File;
  profileImageKey?: string; // Presigned URL 업로드 후 fileKey
  profileImageName?: string; // 원본 파일명
  profileImageType?: string; // 파일 타입
  locationId?: number;
  locationName?: string;

  // 이력서 입력 항목
  overview: string;
  desiredPosition?: string;
  desiredJobCategoryId?: number;

  skills?: string[];

  // 외부 링크 (자유 입력)
  extraLink1?: string;
  extraLink2?: string;

  // 파일/URL 이력서
  resumeFile?: File;
  resumeFileKey?: string;
  resumeFileName?: string;
  resumeFileType?: string;
  resumeUrl?: string;

  // 섹션 내용
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
  desiredLocationName?: string | null;
  experienceLevel?: string | null;
  educationLevel?: string | null;
  desiredSalaryCode?: string | null;
  skills?: string;
  profileImageUrl?: string | null;
}

interface ResumeEditorProps {
  resumeType?: string;
  resumeId?: string;
  isEditMode?: boolean;
  profile?: Profile | null;
}

export function ResumeEditor({
  resumeType = "direct",
  resumeId,
  isEditMode = false,
  profile,
}: ResumeEditorProps) {
  // 이력서 기본 정보 자동 세팅
  useEffect(() => {
    async function fetchBaseInfo() {
      try {
        const { data } = await apiClient.get<{ data: any }>(
          "/api/personal/resume/base-info"
        );
        if (data && data.data) {
          console.log("base-info 응답:", data.data);
          setResumeData((prev) => {
            const next = {
              ...prev,
              name: data.data.name || "",
              email: data.data.email || "",
              phone: data.data.phone || "",
              profileImageKey: data.data.profileImageKey || "",
              locationId: data.data.locationId || undefined,
              desiredJobCategoryId: data.data.desiredJobCategoryId || undefined,
              skills: data.data.skills ? data.data.skills.split(",") : [],
            };
            console.log("setResumeData(next):", next);
            return next;
          });
        }
      } catch (e) {
        console.error("base-info 불러오기 실패:", e);
      }
    }
    fetchBaseInfo();
  }, []);

  const router = useRouter();
  const { toast } = useToast();
  const isMobile = useMobile();

  // Convert resumeType string to number
  const resumeTypeNum =
    resumeType === "file" ? 1 : resumeType === "url" ? 2 : 0;

  // State for resume data
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayStr = `${yyyy}-${mm}-${dd}`;

  const [resumeData, setResumeData] = useState<ResumeData>({
    title: `새 이력서 (${todayStr})`,
    createdAt: todayStr,
    status: 1, // Default to private
    resumeType: resumeTypeNum,
    name: "",
    email: "",
    phone: "",
    profileImage: undefined,
    locationId: undefined,
    locationName: "",
    overview: "",
    desiredPosition: "",
    desiredJobCategoryId: undefined,
    skills: [],
    extraLink1: "",
    extraLink2: "",
    resumeFileKey: undefined,
    resumeFileName: undefined,
    resumeFileType: undefined,
    resumeUrl: "",
  });

  // State for resume sections (UI 관리용)
  const getInitialSections = () => {
    const baseSections: ResumeSection[] = [
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
        content: {
          selectedCoverLetterId: null,
          selectedCoverLetterTitle: null,
        },
      },
    ];
    // 파일로 작성일 때 맨 앞에 이력서 파일 섹션 추가
    if (resumeTypeNum === 1) {
      return [
        {
          id: "resumeFile",
          title: "이력서 파일",
          sectionType: -1,
          isActive: true,
          content: [],
        },
        ...baseSections,
      ];
    }
    if (resumeTypeNum === 2) {
      return [
        {
          id: "resumeUrl",
          title: "이력서 URL",
          sectionType: -2,
          isActive: true,
          content: "",
        },
        ...baseSections,
      ];
    }
    return baseSections;
  };
  const [sections, setSections] = useState<ResumeSection[]>(
    getInitialSections()
  );

  // resumeType 변경 시 sections 구조 동기화
  useEffect(() => {
    setSections(getInitialSections());
  }, [resumeTypeNum]);

  // State for add section modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 저장 축하 오버레이 상태
  const [showCelebration, setShowCelebration] = useState(false);

  // Handle save resume
  const handleSaveResume = useCallback(async () => {
    if (!resumeData.title) {
      toast({
        title: "필수 항목을 입력해주세요",
        description: "이력서 제목은 필수 항목입니다.",
        variant: "destructive",
      });
      throw new Error("이력서 제목 없음");
    }
    if (resumeData.desiredJobCategoryId == null) {
      toast({
        title: "희망 직무를 선택해주세요",
        description: "희망 직무(직무 카테고리)는 필수 항목입니다.",
        variant: "destructive",
      });
      throw new Error("희망 직무 없음");
    }
    if (isEditMode && !resumeId) {
      toast({ title: "이력서 ID가 없습니다.", variant: "destructive" });
      return;
    }
    try {
      // 날짜 형식 변환 함수 (yyyy-MM -> yyyy-MM-dd)
      const formatDate = (dateStr: string | undefined): string => {
        if (!dateStr) return "";

        // 이미 yyyy-MM-dd 형식이면 그대로 반환
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
          return dateStr;
        }

        // yyyy-MM 형식이면 yyyy-MM-01로 변환
        if (/^\d{4}-\d{2}$/.test(dateStr)) {
          return `${dateStr}-01`;
        }

        // 기타 형식은 빈 문자열 반환
        return "";
      };

      // Presigned URL 기반 파일 업로드 방식 적용
      // 1. 모든 파일(프로필, 이력서, 섹션 내 파일 등)은 이미 S3 업로드 후 fileKey/fileName/fileType만 상태에 저장되어야 함
      // 2. 저장 시에는 fileKey/fileName/fileType만 백엔드로 전송, File/FormData/multipart 사용 금지

      // 섹션 컨텐츠 변환 (날짜 변환 등 기존 로직 유지)
      const resumeContents = sections
        .filter((section) => section.isActive && Array.isArray(section.content))
        .flatMap((section) =>
          section.content.map((item: any, idx: number) => {
            let contentId = undefined;
            if (typeof item.id === "number") {
              contentId = item.id;
            } else if (typeof item.id === "string" && /^\d+$/.test(item.id)) {
              contentId = parseInt(item.id);
            }
            const fromDate = formatDate(item.dateFrom || item.startDate || "");
            const toDate = formatDate(item.dateTo || item.endDate || "");
            // 파일 정보(fileKey 등)만 포함
            const fileMeta = item.fileKey
              ? {
                  fileKey: item.fileKey,
                  fileName: item.fileName,
                  fileType: item.fileType,
                }
              : {};
            return {
              id: contentId,
              sectionType: section.sectionType,
              sectionTitle: section.title,
              organization:
                item.organization || item.school || item.company || "",
              title: item.title || item.degree || item.position || "",
              field: item.field || item.major || "",
              dateFrom: fromDate,
              dateTo: toDate,
              description: item.description || "",
              contentOrder: idx + 1,
              ...fileMeta,
            };
          })
        );

      // 저장할 데이터 구성
      const requestData = {
        profile: {
          id: resumeData.profileId,
          locationId: resumeData.locationId,
          skills: Array.isArray(resumeData.skills)
            ? resumeData.skills.join(",")
            : "",
          desiredJobCategoryId:
            typeof resumeData.desiredJobCategoryId === "number"
              ? resumeData.desiredJobCategoryId
              : (() => {
                  throw new Error(
                    "직무 ID(desiredJobCategoryId)가 올바르지 않습니다."
                  );
                })(),
          // 프로필 이미지 fileKey만 전송
          ...(resumeData.profileImageKey
            ? { profileImageKey: resumeData.profileImageKey }
            : {}),
        },
        resume: {
          ...(resumeId ? { id: parseInt(resumeId) } : {}),
          profileId: profile?.profileId,
          title: resumeData.title,
          overview: resumeData.overview,
          resumeType: resumeData.resumeType,
          resumeUrl: resumeData.resumeUrl,
          extraLink1: resumeData.extraLink1,
          extraLink2: resumeData.extraLink2,
          status: resumeData.status,
          // 이력서 파일 fileKey만 전송
          ...(resumeData.resumeFileKey
            ? {
                resumeFileKey: resumeData.resumeFileKey,
                resumeFileName: resumeData.resumeFileName,
                resumeFileType: resumeData.resumeFileType,
              }
            : {}),
        },
        resumeContents,
      };

      // 실제 저장 API 호출 (JSON 전송)
      const response = await apiClient.post(
        `/api/personal/resume/create`,
        requestData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("저장 응답:", response.data);
      toast({
        title: isEditMode
          ? "이력서가 수정되었습니다!"
          : "이력서가 저장되었습니다!",
        description: isEditMode
          ? "이력서가 성공적으로 수정되었습니다."
          : "이력서가 성공적으로 저장되었습니다.",
      });
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
        router.push("/personal/mypage/resume");
      }, 1500);
    } catch (error: any) {
      console.error("저장 오류:", error);
      console.error("응답 데이터:", error.response?.data);

      toast({
        title: "저장 중 오류가 발생했습니다",
        description:
          error.response?.data?.message || error?.message || String(error),
        variant: "destructive",
      });
    }
  }, [resumeData, sections, profile, resumeId, isEditMode, router, toast]);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchResumeData = async () => {
      if (isEditMode && resumeId) {
        try {
          const { data } = await apiClient.get<{ data: any }>(
            `/api/personal/resume/view/${resumeId}`
          );
          const resume = data.data;

          // 프로필 정보
          const profileInfo = resume.profileInfo || {};
          setResumeData({
            id: resume.id,
            title: resume.title ?? "",
            status: resume.status ?? 1,
            resumeType: resume.resumeType ?? 0,
            name: profileInfo.name ?? "",
            email: profileInfo.email ?? "",
            phone: profileInfo.phone ?? "",
            profileId: profileInfo.profileId ?? undefined,
            profileImage: profileInfo.profileImageUrl ?? undefined,
            locationId: profileInfo.desiredLocationId ?? undefined,
            locationName: profileInfo.desiredLocationName ?? "",
            overview: resume.overview ?? "",
            desiredPosition: "", // 필요시 추후 추가
            desiredJobCategoryId: profileInfo.desiredJobCategoryId ?? undefined,
            skills: profileInfo.skills ? profileInfo.skills.split(",") : [],
            extraLink1: resume.extraLink1 ?? "",
            extraLink2: resume.extraLink2 ?? "",
            resumeFileKey: resume.resumeFile ?? undefined,
            resumeFileName: undefined,
            resumeFileType: undefined,
            resumeUrl: resume.resumeUrl ?? "",
            resumeFile: undefined,
          });

          // 섹션 데이터 매핑
          setSections((prevSections) => {
            return prevSections.map((section) => {
              const sectionContents = (resume.contents || []).filter(
                (c: any) => c.sectionType === section.sectionType
              );
              return {
                ...section,
                content: sectionContents.map((c: any) => ({
                  id: c.id,
                  organization: c.organization,
                  title: c.title,
                  field: c.field,
                  description: c.description,
                  startDate: c.dateFrom ? c.dateFrom.slice(0, 10) : "",
                  endDate: c.dateTo ? c.dateTo.slice(0, 10) : "",
                })),
              };
            });
          });
        } catch (error) {
          console.error("이력서 데이터 불러오기 실패:", error);
          toast({
            title: "이력서 정보를 불러오는데 실패했습니다",
            description: "이력서를 불러오는 중 오류가 발생했습니다.",
            variant: "destructive",
          });
        }
      }
    };

    if (isEditMode && resumeId) {
      fetchResumeData();
    }
  }, [isEditMode, resumeId, resumeTypeNum, profile, toast]);

  // Handle save keyboard shortcut
  useEffect(() => {
    const handleSaveShortcut = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveResume();
      }
    };

    window.addEventListener("keydown", handleSaveShortcut);
    return () => window.removeEventListener("keydown", handleSaveShortcut);
  }, [handleSaveResume]);

  // Handle section toggle
  const handleSectionToggle = (sectionId: string) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? { ...section, isActive: !section.isActive }
          : section
      )
    );
  };

  // Handle section reorder
  const handleSectionReorder = (reorderedSections: ResumeSection[]) => {
    setSections(reorderedSections);
  };

  // Handle section content update
  const handleSectionContentUpdate = (sectionId: string, content: any) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId ? { ...section, content } : section
      )
    );
  };

  // Handle add new section
  const handleAddSection = async (newSection: ResumeSection) => {
    if (isEditMode && !resumeId) {
      toast({ title: "이력서 ID가 없습니다.", variant: "destructive" });
      return;
    }
    try {
      // 새 섹션 추가 - 백엔드 API 호출은 최종 저장 시에만 하도록 변경
      setSections((prevSections) => [
        ...prevSections,
        {
          ...newSection,
          // 임시 ID 생성 (저장 시 제거됨)
          id: `temp-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        },
      ]);
      setIsAddModalOpen(false);
      toast({ title: "항목이 추가되었습니다." });
    } catch (err: any) {
      toast({
        title: "항목 추가 실패",
        description: err?.message || String(err),
        variant: "destructive",
      });
    }
  };

  // Get active sections
  const activeSections = sections.filter((section) => section.isActive);

  // profile이 아직 준비되지 않았으면 로딩 표시
  if (!profile) {
    return <div>프로필 정보를 불러오는 중...</div>;
  }

  return (
    <>
      {/* 저장 축하 애니메이션 오버레이 */}
      <CelebrationOverlay show={showCelebration}>
        <ConfettiCelebration run={showCelebration} />
      </CelebrationOverlay>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">
          {isEditMode ? "이력서 수정" : "이력서 작성"}
        </h1>
        {isMobile ? (
          <Tabs defaultValue="editor" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="editor">작성</TabsTrigger>
              <TabsTrigger value="manager">항목 관리</TabsTrigger>
            </TabsList>
            <TabsContent value="editor" className="mt-4">
              <ResumeBasicInfoCard
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
              <div className="mt-4">
                <ResumeSectionEditorList
                  sections={activeSections}
                  onSectionContentUpdate={handleSectionContentUpdate}
                />
              </div>
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
            {/* 좌측: 기본 정보 + 작성 영역 */}
            <div className="flex-[0_0_70%] max-w-[70%]">
              <ResumeBasicInfoCard
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
              <div className="mt-8">
                <ResumeSectionEditorList
                  sections={activeSections}
                  onSectionContentUpdate={handleSectionContentUpdate}
                />
              </div>
            </div>
            {/* 우측: 항목 관리 패널 */}
            <div className="flex-[0_0_30%] max-w-[30%]">
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
    </>
  );
}
