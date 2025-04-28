import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import ProfileFormField from "../ProfileFormField";
import { useUserStore } from "@/store/useUserStore";

interface PersonalInfoTabProps {
  isEditing: boolean;
}

export default function PersonalInfoTab({ isEditing }: PersonalInfoTabProps) {
  const { userInfo } = useUserStore();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileFormField
          label="이름"
          id="name"
          defaultValue={userInfo?.name as string}
          isEditing={isEditing}
        />

        <ProfileFormField
          label="이메일"
          id="email"
          type="email"
          defaultValue="admin@saramin.co.kr"
          isEditing={isEditing}
        />

        <ProfileFormField
          label="전화번호"
          id="phone"
          defaultValue="010-1234-5678"
          isEditing={isEditing}
        />

        <ProfileFormField
          label="직책"
          id="position"
          defaultValue="시스템 관리자"
          isEditing={isEditing}
        />

        <div className="space-y-3 md:col-span-2">
          <Label htmlFor="bio">자기소개</Label>
          <Textarea
            id="bio"
            rows={4}
            defaultValue="MeetU 플랫폼의 시스템 관리자로 근무하고 있습니다. 사용자 경험 향상과 시스템 안정성 유지를 위해 노력하고 있습니다."
            readOnly={!isEditing}
            className={!isEditing ? "bg-gray-50 resize-none" : "resize-none"}
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            저장하기
          </Button>
        </div>
      )}
    </div>
  );
}
