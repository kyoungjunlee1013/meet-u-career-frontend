"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { ApplicantStatus } from "@/types/applicants";

interface StatusManagementCardProps {
  currentStatus: ApplicantStatus;
  onStatusChange: (status: ApplicantStatus) => void;
}

const STATUSES: ApplicantStatus[] = [
  "서류검토중",
  "서류합격",
  "서류불합격",
  "면접완료",
];

export const StatusManagementCard = ({
  currentStatus,
  onStatusChange,
}: StatusManagementCardProps) => {
  const [selected, setSelected] = useState<ApplicantStatus>(currentStatus);

  const handleChange = (value: string) => {
    setSelected(value as ApplicantStatus);
  };

  const handleSave = () => {
    onStatusChange(selected);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>지원 상태 변경</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selected} onValueChange={handleChange}>
          {STATUSES.map((status) => (
            <div key={status} className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value={status} id={status} />
              <Label htmlFor={status}>{status}</Label>
            </div>
          ))}
        </RadioGroup>

        <div className="mt-4">
          <Button onClick={handleSave} className="w-full">
            저장
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
