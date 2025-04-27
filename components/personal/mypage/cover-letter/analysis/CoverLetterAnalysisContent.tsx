import React, { useEffect, useState } from "react";
import { CoverLetterBasicInfoCard } from "../CoverLetterBasicInfoCard";
import { CoachingSectionEditor } from "../../personal/coaching/CoachingSectionEditor";
import { CoverLetterContentEditorList } from "../CoverLetterContentEditorList";
import { CoverLetterPreviewModal } from "../CoverLetterPreviewModal";
import { useMobile } from "@/hooks/use-mobile";

interface CoverLetterAnalysisContentProps {
  coverLetterId: string;
}

export const CoverLetterAnalysisContent = ({ coverLetterId }: CoverLetterAnalysisContentProps) => {
  const [coverLetter, setCoverLetter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/personal/coverletter/view?id=${coverLetterId}`)
      .then(res => res.json())
      .then(json => {
        if (json && json.data) {
          setCoverLetter(json.data);
        } else {
          setError("자기소개서 정보를 불러오는데 실패했습니다.");
        }
      })
      .catch(() => setError("자기소개서 정보를 불러오는데 실패했습니다."))
      .finally(() => setLoading(false));
  }, [coverLetterId]);

  if (loading) {
    return <div className="text-lg text-center py-8">분석 데이터를 불러오는 중...</div>;
  }
  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>;
  }
  if (!coverLetter || !coverLetter.title) {
    return <div className="text-lg text-center py-8">자기소개서 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <CoverLetterBasicInfoCard
        coverLetterData={{ title: coverLetter.title, status: coverLetter.status ?? 0, id: coverLetter.id }}
        setCoverLetterData={() => {}}
      />
      <div className="mt-6">
        <CoverLetterContentEditorList
          sections={coverLetter.sections || []}
          onSectionContentUpdate={() => {}}
          onRequestFeedback={() => {}}
          onApplyFeedback={() => {}}
        />
      </div>
      <CoverLetterPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        coverLetter={{
          title: coverLetter.title,
          sections: (coverLetter.sections || []).map((s: any) => ({ title: s.sectionTitle, content: s.content })),
          updatedAt: new Date(),
        }}
      />
      <div className="flex flex-col md:flex-row justify-end pt-6 gap-3">
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
};
