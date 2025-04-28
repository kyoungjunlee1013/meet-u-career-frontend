"use client";

import { apiClient } from "@/api/apiClient";
import { useEffect, useState } from "react";
import { ResumePreviewModal } from "./ResumePreviewModal"; // 추가
import { ResumeHeader } from "./ResumeHeader";
import { ResumeSummaryStatsCardList } from "./ResumeSummaryStatsCardList";
import { ResumeTypeTabGroup } from "./ResumeTypeTabGroup";
import { ResumeCardList } from "./ResumeCardList";
import { ResumeEmptyState } from "./ResumeEmptyState";
import { Pagination } from "../bookmarks/Pagination";

export const ResumeContent = () => {
  // --- 미리보기 모달 상태 및 핸들러 상위 관리 ---
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any | null>(null); // ResumeSaveRequestDTO 타입

  const handlePreview = async (resumeId: number) => {
    try {
      const res = await apiClient.get(`/api/personal/resume/view/${resumeId}`);
      setPreviewData(res.data.data);
      setIsPreviewOpen(true);
    } catch (e) {
      alert("이력서 상세 정보를 불러오지 못했습니다.");
    }
  };
  const [activeTab, setActiveTab] = useState<number | null>(null);
  type Resume = {
    id: number;
    title: string;
    updatedAt: string;
    resumeType: number;
    isPrimary: boolean;
    status: number;
  };

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    apiClient
      .get("/api/personal/resume/list")
      .then((res) => {
        console.log(
          "[ResumeContent] API에서 받아온 이력서 개수:",
          res.data.data.length
        );

        console.log("data : ", res.data.data);

        // resumeId -> id 매핑
        const mapped = res.data.data.map((item: any) => ({
          id: item.id,
          title: item.title,
          updatedAt: item.updatedAt,
          resumeType: item.resumeType,
          isPrimary: item.isPrimary,
          status: item.status,
          // 필요하다면 추가 필드 매핑
        }));
        setResumes(mapped);
      })
      .catch((err) => {
        // 에러 처리
        console.error(err);
      });
  }, []);

  // Filter resumes based on active tab
  const filteredResumes =
    activeTab !== null
      ? resumes.filter((resume) => resume.resumeType === activeTab)
      : resumes;
  console.log("[ResumeContent] 필터링된 이력서 개수:", filteredResumes.length);

  // 페이지네이션: 현재 페이지의 이력서만 추출
  const totalPages = Math.max(1, Math.ceil(filteredResumes.length / pageSize));
  const pagedResumes = filteredResumes.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  console.log(
    `[ResumeContent] 현재 페이지(${currentPage})에 보여줄 이력서 개수:`,
    pagedResumes.length
  );

  // 페이지/탭 변경 시 1페이지로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filteredResumes.length]);

  // Calculate stats
  const stats = {
    total: resumes.length,
    meetU: resumes.filter((r) => r.resumeType === 0).length,
    fileAndLink: resumes.filter((r) => r.resumeType === 1 || r.resumeType === 2)
      .length,
  };

  // Handle set primary resume
  const handleSetPrimary = (id: number) => {
    setResumes((prev) =>
      prev.map((resume) => ({
        ...resume,
        isPrimary: resume.id === id,
      }))
    );
  };

  // Handle delete resume
  const handleDelete = (id: number) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
  };

  return (
    <>
      <div className="space-y-6">
        <ResumeHeader />
        <ResumeSummaryStatsCardList stats={stats} />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ResumeTypeTabGroup
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {filteredResumes.length > 0 ? (
            <>
              <ResumeCardList
                resumes={pagedResumes}
                onSetPrimary={handleSetPrimary}
                onDelete={handleDelete}
                onPreview={handlePreview}
              />
              <div className="mt-8 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <ResumeEmptyState activeTab={activeTab} />
          )}
        </div>
      </div>
      {/* --- 미리보기 모달 상위에서 렌더링 --- */}
      {isPreviewOpen && previewData && (
        <ResumePreviewModal
          data={previewData}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      )}
    </>
  );
};
