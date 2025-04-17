export default function MembersTable() {
  const members = [
    {
      id: 1,
      name: "강현우",
      email: "hyunwoo.kang@example.com",
      type: "개인",
      company: "디자인허브",
      position: "팀장",
      joinDate: "2023. 06. 20.",
      status: "일반",
    },
    {
      id: 2,
      name: "정민수",
      email: "minsu.jung@example.com",
      type: "개인",
      company: "-",
      position: "-",
      joinDate: "2023. 05. 15.",
      status: "비활성",
    },
    {
      id: 3,
      name: "최대리",
      email: "daeri.choi@example.com",
      type: "기업",
      company: "테크스타트",
      position: "대리",
      joinDate: "2023. 04. 05.",
      status: "승인 대기",
    },
    {
      id: 4,
      name: "박서연",
      email: "seoyeon.park@example.com",
      type: "개인",
      company: "-",
      position: "-",
      joinDate: "2023. 03. 10.",
      status: "활성",
    },
    {
      id: 5,
      name: "이부장",
      email: "admin2@saramin.co.kr",
      type: "기업",
      company: "사람인HR",
      position: "부장",
      joinDate: "2023. 02. 20.",
      status: "활성",
    },
    {
      id: 6,
      name: "김지원",
      email: "jiwon.kim@example.com",
      type: "개인",
      company: "-",
      position: "-",
      joinDate: "2023. 01. 15.",
      status: "활성",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "활성":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">활성</span>
      case "비활성":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">비활성</span>
      case "승인 대기":
        return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">승인 대기</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">일반</span>
    }
  }

  const getTypeBadge = (type) => {
    return (
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          type === "기업" ? "bg-gray-200 text-gray-800" : "bg-blue-100 text-blue-800"
        }`}
      >
        {type}
      </span>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              이름
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              이메일
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              회원 유형
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              기업명
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              직책
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              가입일
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              상태
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
                    {member.name.charAt(0)}
                  </div>
                  <div className="text-sm font-medium text-gray-900">{member.name}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{getTypeBadge(member.type)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.company}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.position}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.joinDate}</td>
              <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(member.status)}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors">
                    수정
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors">
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
