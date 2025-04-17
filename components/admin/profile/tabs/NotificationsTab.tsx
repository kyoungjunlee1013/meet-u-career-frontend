import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SectionDivider from "../SectionDivider"
import NotificationToggle from "../NotificationToggle"

export default function NotificationsTab() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">이메일 알림</h3>
        <div className="space-y-3">
          <NotificationToggle
            id="system-notifications"
            title="시스템 알림"
            description="시스템 업데이트 및 중요 공지사항"
            defaultChecked={true}
          />
          <NotificationToggle
            id="security-notifications"
            title="보안 알림"
            description="계정 로그인 및 보안 관련 알림"
            defaultChecked={true}
          />
          <NotificationToggle
            id="user-activity-notifications"
            title="사용자 활동 알림"
            description="새로운 사용자 가입 및 활동 알림"
            defaultChecked={false}
          />
        </div>
      </div>

      <SectionDivider>
        <h3 className="text-lg font-medium">알림 빈도</h3>
        <div className="space-y-3">
          <Label htmlFor="notification-frequency">알림 수신 빈도</Label>
          <Select defaultValue="daily">
            <SelectTrigger id="notification-frequency">
              <SelectValue placeholder="알림 빈도 선택" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="realtime">실시간</SelectItem>
              <SelectItem value="daily">일간 요약</SelectItem>
              <SelectItem value="weekly">주간 요약</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SectionDivider>

      <div className="flex justify-end">
        <Button>설정 저장</Button>
      </div>
    </div>
  )
}
