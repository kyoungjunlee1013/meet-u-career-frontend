"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CoverLetterContentProps } from "@/types/applicants";

export const CoverLetterContent = ({
  title,
  contents,
}: CoverLetterContentProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title || "자기소개서"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {contents && contents.length > 0 ? (
          contents.map((section, index) => (
            <div key={index} className="space-y-1">
              <h4 className="text-sm font-semibold">{section.sectionTitle}</h4>
              <p className="whitespace-pre-line text-sm text-gray-700">
                {section.content}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">자기소개서 정보가 없습니다.</p>
        )}
      </CardContent>
    </Card>
  );
};
