import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import Image from "next/image"

const chats = [
  {
    id: 1,
    name: "김채용",
    company: "ABC 주식회사",
    message: "안녕하세요, 지원해주셔서 감사합니다. 면접 일정을 조율하고 싶습니다.",
    time: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    unread: true,
  },
  {
    id: 2,
    name: "이인사",
    company: "테크 솔루션즈",
    message: "면접 일정이 확정되었습니다. 확인 부탁드립니다.",
    time: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    unread: true,
  },
  {
    id: 3,
    name: "박매니저",
    company: "글로벌 시스템즈",
    message: "추가 서류 제출 부탁드립니다.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    unread: false,
  },
]

const ChatDropdown = () => {
  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-medium text-sm">채팅</h3>
        <button className="text-xs text-blue-600 hover:text-blue-800">모두 읽기</button>
      </div>

      <div className="max-h-80 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="py-6 text-center text-gray-500 text-sm">채팅이 없습니다</div>
        ) : (
          <ul>
            {chats.map((chat) => (
              <li
                key={chat.id}
                className={`p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer ${chat.unread ? "bg-blue-50" : ""
                  }`}
              >
                <div className="flex gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/etc/placeholder.svg?height=40&width=40"
                      alt={`${chat.name} 프로필`}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <p className="text-sm font-medium truncate">{chat.name}</p>
                      <span className="text-xs text-gray-500 ml-1 flex-shrink-0">
                        {formatDistanceToNow(chat.time, {
                          addSuffix: false,
                          locale: ko,
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">{chat.company}</p>
                    <p className="text-xs text-gray-700 mt-1 truncate">{chat.message}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="p-2 border-t">
        <button className="w-full py-2 text-sm text-center text-blue-600 hover:text-blue-800 hover:bg-gray-50 rounded">
          채팅 더보기
        </button>
      </div>
    </div>
  )
}

export default ChatDropdown
