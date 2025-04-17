import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import SectionDivider from "../SectionDivider"
import LoginHistoryItem from "../LoginHistoryItem"

export default function SecurityTab() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">비밀번호 변경</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">현재 비밀번호</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">새 비밀번호</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">비밀번호 확인</Label>
            <Input id="confirm-password" type="password" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>비밀번호 변경</Button>
        </div>
      </div>

      <SectionDivider>
        <h3 className="text-lg font-medium">2단계 인증</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">2단계 인증 활성화</p>
            <p className="text-sm text-gray-500">로그인 시 추가 보안 코드를 요구합니다</p>
          </div>
          <Switch id="two-factor" />
        </div>
      </SectionDivider>

      <SectionDivider>
        <h3 className="text-lg font-medium">로그인 기록</h3>
        <div className="bg-gray-50 rounded-md p-4 space-y-3">
          <LoginHistoryItem
            browser="Chrome"
            os="Windows"
            location="서울, 대한민국"
            date="2023-04-01 09:15:22"
            isCurrentSession={true}
          />
          <LoginHistoryItem
            browser="Safari"
            os="macOS"
            location="서울, 대한민국"
            date="2023-03-28 14:22:10"
            isCurrentSession={false}
          />
        </div>
      </SectionDivider>
    </div>
  )
}
