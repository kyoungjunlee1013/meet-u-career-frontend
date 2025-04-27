"use client"

import type { JobPostingFormData } from "./schema";
import { BasicTemplate } from "./templates/BasicTemplate";
import { RichTemplate } from "./templates/RichTemplate";
import { MinimalTemplate } from "./templates/MinimalTemplate";

interface JobPostingPreviewProps {
  formData: JobPostingFormData;
}

export function JobPostingPreview({ formData }: JobPostingPreviewProps) {
  // 템플릿 타입에 따라 다른 컴포넌트 렌더
  switch (formData.templateType) {
    case 1:
      return <RichTemplate data={formData} />;
    case 2:
      return <MinimalTemplate data={formData} />;
    case 0:
    default:
      return <BasicTemplate data={formData} />;
  }
}
