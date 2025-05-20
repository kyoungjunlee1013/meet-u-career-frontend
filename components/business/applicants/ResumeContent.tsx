import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { ResumeApplicationDetail } from "@/types/applicants";

interface ResumeContentProps {
  applicant: ResumeApplicationDetail;
}

export const ResumeContent = ({ applicant }: ResumeContentProps) => {
  const contents = applicant.resumeContents || [];

  // sectionTitle 기준으로 그룹화
  const grouped = contents.reduce<Record<string, typeof contents>>((acc, item) => {
    if (!acc[item.sectionTitle]) acc[item.sectionTitle] = [];
    acc[item.sectionTitle].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([sectionTitle, items]) => (
        <Card key={sectionTitle}>
          <CardHeader className="pb-2">
            <CardTitle>{sectionTitle}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="space-y-1">
                {item.organization && <p className="font-semibold">{item.organization}</p>}
                {item.title && <p>{item.title}</p>}
                {item.field && <p className="text-sm text-gray-500">{item.field}</p>}
                {item.description && <p className="text-sm">{item.description}</p>}
                {(item.dateFrom || item.dateTo) && (
                  <p className="text-sm text-gray-400">
                    {item.dateFrom || "?"} ~ {item.dateTo || "현재"}
                  </p>
                )}
                {index < items.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
