"use client"

import React, { useState } from "react";
import { apiClient } from "@/api/apiClient";
import { CoverLetterStatsCardList } from "./CoverLetterStatsCardList";
import { CoverLetterCardList } from "./CoverLetterCardList";
import { CoverLetterEmptyState } from "./CoverLetterEmptyState";
import { CoverLetterTypeTabGroup } from "./CoverLetterTypeTabGroup";
import { Pagination } from "./Pagination";
import { CoverLetterPreviewModal } from "./CoverLetterPreviewModal";

// CoverLetter 타입 선언 (백엔드 DTO와 매칭, 필요한 필드만 우선 적용)
interface CoverLetter {
  id: number;
  title: string;
  company?: string;
  updatedAt: string;
  status: string;
  sections?: { title: string; content: string }[];
}

import { useToast } from "@/hooks/use-toast";

export const CoverLetterContent = () => {
  const { toast } = useToast();
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  // 상세보기 모달 상태
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedCoverLetter, setSelectedCoverLetter] = useState<CoverLetter | null>(null);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  // 상세보기 핸들러: 항상 최신/정확한 데이터 fetch
  const handlePreview = async (coverLetter: CoverLetter) => {
    setLoadingPreview(true);
    setPreviewError(null);
    try {
      // 상세 API 호출 (id 기반)
      const res = await apiClient.get(`/api/personal/coverletter/view?id=${coverLetter.id}`);
      if (!res.data) throw new Error('서버 응답 오류');
      if (res.data && res.data.data) {
        setSelectedCoverLetter(res.data.data);
      } else {
        setSelectedCoverLetter(coverLetter);
      }
      setPreviewOpen(true);
    } catch (err) {
      setPreviewError('상세 데이터를 불러오지 못했습니다.');
      setSelectedCoverLetter(coverLetter);
      setPreviewOpen(true);
    } finally {
      setLoadingPreview(false);
    }
  }

  // 마운트 시 자기소개서 목록 불러오기
  React.useEffect(() => {
    const fetchCoverLetters = async () => {
      try {
        const res = await apiClient.get("/api/personal/coverletter/list");
        if (!res.data) throw new Error("서버 오류");
        setCoverLetters(res.data.data || []);
      } catch (err) {
        toast({ title: "목록을 불러올 수 없습니다.", variant: "destructive" });
      }
    };
    fetchCoverLetters();
  }, []);

  // 탭 상태 관리 ("all", "analyzed", "unanalyzed")
  const [activeTab, setActiveTab] = useState<string>("all");
  const [sort, setSort] = useState<string>("latest");

  // 정렬 변경 핸들러 (필요시 확장)
  const handleSortChange = (value: string) => setSort(value);

  const handleDelete = (coverLetter: any) => {
    toast({
      title: "정말로 삭제하시겠습니까?",
      description: "삭제 후에는 복구할 수 없습니다.",
      variant: "destructive",
      action: (
        <button
          className="px-3 py-1 rounded bg-red-600 text-white"
          onClick={async () => {
            try {
              const res = await apiClient.post(`/api/personal/coverletter/${coverLetter.id}`);
              if (!res.data) throw new Error('서버 오류로 삭제에 실패했습니다.');
              setCoverLetters((prev) => prev.filter((cl) => cl.id !== coverLetter.id));
              toast({ title: "삭제되었습니다.", variant: "default" });
            } catch (err: any) {
              toast({ title: err.message || "삭제에 실패했습니다.", variant: "destructive" });
            }
          }}
        >
          확인
        </button>
      ),
    });
  }

  // 페이징 처리 추가
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // 한 페이지당 카드 개수(스크랩 페이지와 맞춤)

  // 탭 및 검색어에 따라 coverLetters 필터링
  const filteredCoverLetters = coverLetters
    .filter((cl) => {
      // 탭 필터
      if (activeTab === "analyzed" && cl.status !== "완료") return false;
      if (activeTab === "unanalyzed" && cl.status === "완료") return false;
      return true;
    })
    .sort((a, b) => {
      // 정렬
      if (sort === "latest") {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      } else {
        return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
      }
    });

  // 페이지별 카드 리스트 계산
  const totalPages = Math.max(1, Math.ceil(filteredCoverLetters.length / itemsPerPage));
  const pagedCoverLetters = filteredCoverLetters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 탭/필터 변경 시 페이지 리셋
  // (탭, 정렬 변경 등에서 currentPage = 1로 리셋 필요)
  // 예시: useEffect(() => { setCurrentPage(1); }, [activeTab, sort]);

  return (
    <>
      <div className="space-y-6">
        <CoverLetterStatsCardList
          totalCount={coverLetters.length}
          analyzedCount={coverLetters.filter((cl) => cl.status === "완료").length}
          unanalyzedCount={coverLetters.filter((cl) => cl.status !== "완료").length}
        />
        <div className="bg-white rounded-lg shadow-sm p-6">
          <CoverLetterTypeTabGroup activeTab={activeTab} setActiveTab={setActiveTab} />
          {filteredCoverLetters.length > 0 ? (
            <>
              <CoverLetterCardList coverLetters={pagedCoverLetters} onDelete={handleDelete} onPreview={handlePreview} />
              {loadingPreview && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg px-8 py-6 shadow text-lg font-semibold">상세 내용을 불러오는 중...</div>
                </div>
              )}
              {previewError && (
                <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
                  <div className="bg-white rounded-lg px-8 py-6 shadow text-red-600 font-semibold">{previewError}</div>
                </div>
              )}
              <div className="flex justify-center mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <CoverLetterEmptyState />
          )}
        </div>
      </div>
      {/* 상세보기 모달 */}
      {selectedCoverLetter && (
  <CoverLetterPreviewModal
    isOpen={previewOpen}
    onClose={() => {
      setPreviewOpen(false);
      setSelectedCoverLetter(null);
    }}
    coverLetter={selectedCoverLetter}
  />
)}
    </>
  );
}

