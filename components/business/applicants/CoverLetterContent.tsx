"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CoverLetterContentProps } from "@/types/applicants";

export const CoverLetterContent = ({
  title,
  contents,
}: CoverLetterContentProps) => {
  return (
    <div className="space-y-6">
      {contents && contents.length > 0 ? (
        contents.map((section, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle>{section.sectionTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-line text-sm text-gray-700">
                {section.content}
              </p>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{title || "자기소개서"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">자기소개서 정보가 없습니다.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
