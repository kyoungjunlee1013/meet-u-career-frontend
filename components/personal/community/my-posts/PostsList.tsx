import { MoreVertical, Heart, MessageSquare, Share2 } from "lucide-react"

export const PostsList = () => {
  const posts = [
    {
      id: 1,
      title: "신입개발자가 되고싶은 사람들 모여라",
      author: "조연화",
      date: "2025.03.06",
      content: "ㅎ ㅎ ㅎ",
      contentDetail: "ㅎ ㅎ ㅎ...",
      likes: 1,
      comments: 1,
    },
    {
      id: 2,
      type: "개발",
      author: "조연화",
      date: "2025.02.23",
      content:
        "Java, JavaScript, JSP, MySQL을 배웠고 현재는 spring boot 개발 배우고 있습니다. 다른 직무하다가 개발쪽에 관심가져서 공부중이에요. 신입개발자가 되고싶으면 취업준비할때 조언좀 해주세요!",
      likes: 1,
      comments: 1,
    },
  ]

  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-lg font-medium">게시글</h2>
      </div>

      <div>
        {posts.map((post) => (
          <div key={post.id} className="p-4 border-b">
            <div className="flex mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-sm mr-3 flex-shrink-0">
                <span>연화</span>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-1">{post.title || post.type}</h3>
                    <p className="text-sm text-gray-500">
                      {post.author} • {post.date}
                    </p>
                  </div>

                  <button className="text-gray-400">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-sm mb-4">{post.content}</p>

            <div className="flex items-center">
              <button className="flex items-center text-gray-500 mr-4">
                <Heart className="h-5 w-5 mr-1" />
              </button>

              <button className="flex items-center text-gray-500 mr-4">
                <MessageSquare className="h-5 w-5 mr-1" />
              </button>

              <button className="flex items-center text-gray-500">
                <Share2 className="h-5 w-5 mr-1" />
              </button>

              <div className="ml-auto flex items-center">
                <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs mr-2">
                  <span>홍</span>
                </div>
                <span className="text-sm text-gray-600">
                  좋아요 {post.likes} • 댓글 {post.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
