export const AccountSettingsTab = () => {
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-4">알림 설정</h2>
      <div className="space-y-4 mb-8">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="email-notifications"
              name="email-notifications"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              defaultChecked
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="email-notifications" className="font-medium text-gray-700">
              이메일 알림
            </label>
            <p className="text-gray-500">채용 소식, 이력서 열람 알림, 면접 제안 등의 정보를 이메일로 받습니다.</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="sms-notifications"
              name="sms-notifications"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              defaultChecked
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="sms-notifications" className="font-medium text-gray-700">
              SMS 알림
            </label>
            <p className="text-gray-500">중요한 알림과 업데이트를 SMS로 받습니다.</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="push-notifications"
              name="push-notifications"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="push-notifications" className="font-medium text-gray-700">
              푸시 알림
            </label>
            <p className="text-gray-500">모바일 앱에서 푸시 알림을 받습니다.</p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-medium text-gray-900 mb-4">개인정보 및 보안</h2>
      <div className="space-y-4 mb-8">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="marketing-consent"
              name="marketing-consent"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              defaultChecked
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="marketing-consent" className="font-medium text-gray-700">
              마케팅 정보 수신 동의
            </label>
            <p className="text-gray-500">서비스안내 마케팅 정보 및 프로모션을 받습니다.</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="two-factor-auth"
              name="two-factor-auth"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="two-factor-auth" className="font-medium text-gray-700">
              2단계 인증
            </label>
            <p className="text-gray-500">로그인 시 추가 보안을 위한 2단계 인증을 사용합니다.</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="auto-login"
              name="auto-login"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              defaultChecked
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="auto-login" className="font-medium text-gray-700">
              자동 로그인
            </label>
            <p className="text-gray-500">다음 방문 시 자동으로 로그인합니다.</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          설정 저장
        </button>
      </div>
    </div>
  )
}
