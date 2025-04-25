"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import { type DocumentsContentProps } from "@/types/applicants";

export const DocumentsContent = ({
  fileName,
  fileType,
  fileUrl,
}: DocumentsContentProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>첨부 서류</CardTitle>
      </CardHeader>
      <CardContent>
        {fileName && fileUrl ? (
          <div className="p-4 border border-gray-200 rounded-md flex justify-between items-center">
            <div>
              <p className="font-medium">{fileName}</p>
              <p className="text-sm text-gray-500">
                {fileType || "파일 형식 알 수 없음"}
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
              >
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            첨부된 이력서 파일이 없습니다.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
