import React from "react";
import { JobPostingPreview } from "./JobPostingPreview";
import type { JobPostingFormData } from "./schema";

interface PreviewModalProps {
  open: boolean;
  onClose: () => void;
  formData: JobPostingFormData;
}

export function PreviewModal({ open, onClose, formData }: PreviewModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-5xl max-h-[95vh] overflow-y-auto rounded-lg shadow-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
          aria-label="닫기"
        >
          &times;
        </button>
        <div className="p-8">
          <JobPostingPreview formData={formData} />
        </div>
      </div>
    </div>
  );
}
