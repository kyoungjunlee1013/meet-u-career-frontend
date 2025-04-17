import { MoreVertical } from "lucide-react"

export const CommentsList = () => {
  const comments = [
    {
      id: 1,
      postTitle: "개발자 취업 준비 어떻게 하나요?",
      postAuthor: "김개발",
      date: "2025.03.05",
      content: "저도 같은 고민을 했었는데, 포트폴리오를 잘 준비하는 것이 중요한 것 같아요.",
    },
    {
      id: 2,
      postTitle: "프론트엔드 vs 백엔드",
      postAuthor: "이디자인",
      date: "2025.03.01",
      content: "저는 백엔드 개발자로 일하고 있는데, 서버 개발이 더 안정적인 것 같습니다.",
    },
  ]

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">댓글</h2>
      </div>

      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border-b">
            <div className="flex mb-2">
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm mr-3 flex-shrink-0">
                <span>연화</span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-1">{comment.postTitle}</h3>
                    <p className="text-sm text-gray-500">
                      {comment.postAuthor}의 게시글 • {comment.date}
                    </p>
                  </div>

                  <button className="text-gray-400">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-sm ml-13 pl-10">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
