"use client"

import { useState, useEffect } from "react"

export const PopularPosts = () => {
  const [popularPosts, setPopularPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // 기본 인기글 데이터 (API 호출 실패 시 사용)
  const fallbackPosts = [
    {
      id: 1,
      title: "면접 팁 공유합니다",
      hashtags: ["#면접", "#취업"],
      likes: 125,
      comments: 42,
      author: "취업마스터",
      date: "2025-04-25"
    },
    {
      id: 2,
      title: "이직 성공 후기와 조언",
      hashtags: ["#이직", "#커리어"],
      likes: 98,
      comments: 31,
      author: "경력자123",
      date: "2025-04-24"
    },
    {
      id: 3,
      title: "자기소개서 작성법 A to Z",
      hashtags: ["#자기소개서", "#취업"],
      likes: 87,
      comments: 23,
      author: "취업준비생",
      date: "2025-04-23"
    }
  ];

  useEffect(() => {
    const fetchPopularPosts = async () => {
      try {
        setIsLoading(true);
        // API 호출
        const response = await fetch('/api/popular-posts');
        
        if (!response.ok) {
          throw new Error('서버 응답 오류');
        }
        
        const data = await response.json();
        setPopularPosts(data.data);
        setError("");
      } catch (err) {
        console.error("인기글 로딩 실패:", err);
        // 오류 발생시 기본 데이터 사용
        setPopularPosts(fallbackPosts);
        // 오류 메시지는 설정하되 화면에 심각한 오류처럼 표시하지 않음
        setError("인기글을 불러오는데 문제가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularPosts();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-lg font-bold mb-3 text-gray-800">인기 게시글</h2>
      
      {isLoading ? (
        // 로딩 상태 표시
        <div className="py-4 text-center text-gray-500">
          인기글을 불러오는 중...
        </div>
      ) : error ? (
        // 오류 발생 시 오류 메시지와 함께 기본 데이터 표시
        <div>
          {error && <p className="text-sm text-gray-500 mb-2">{error}</p>}
          <div className="space-y-3">
            {popularPosts.map((post) => (
              <div key={post.id} className="p-3 border-b last:border-b-0">
                <h3 className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {post.hashtags.map((tag, index) => (
                    <span key={index} className="text-xs text-blue-600">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{post.author}</span>
                  <div className="flex space-x-2">
                    <span>좋아요 {post.likes}</span>
                    <span>댓글 {post.comments}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // 정상적으로 데이터 로딩 성공 시
        <div className="space-y-3">
          {popularPosts.map((post) => (
            <div key={post.id} className="p-3 border-b last:border-b-0">
              <h3 className="font-medium text-gray-800 hover:text-blue-600 cursor-pointer">
                {post.title}
              </h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {post.hashtags.map((tag, index) => (
                  <span key={index} className="text-xs text-blue-600">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>{post.author}</span>
                <div className="flex space-x-2">
                  <span>좋아요 {post.likes}</span>
                  <span>댓글 {post.comments}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button className="w-full mt-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded transition">
        더 보기
      </button>
    </div>
  )
}