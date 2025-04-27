"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Post } from "@/components/personal/community/Post"; // ✅ 경로 수정 완료

export default function PostDetailPage() {
  const params = useParams();
  const postId = params?.postId as string;

  const [postData, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/personal/community/posts/detail/${postId}`);
        console.log("받은 상세 데이터:", response.data.data);
        setPostData(mapPostData(response.data.data)); // ✅ Post 컴포넌트에 맞게 매핑
      } catch (err) {
        console.error("게시글 불러오기 실패", err);
        setError("게시글을 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) return <div className="p-6">로딩 중...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!postData) return <div className="p-6">게시글이 존재하지 않습니다.</div>;

  return (
    <div className="p-6">
      <Post post={postData} />
    </div>
  );
}

/**
 * 🧩 서버에서 받은 게시글 상세 데이터(CommunityPostDTO 형태)를
 * Post 컴포넌트가 기대하는 형태로 변환하는 매핑 함수
 */
function mapPostData(data: any) {
  return {
    id: data.id,
    author: {
      name: `user${data.accountId}`, // 지금은 accountId로 대충 표시 (추후 닉네임 연동 가능)
      avatar: data.profileImageUrl || "/profile.png",
    },
    content: data.content,
    image: data.postImageUrl || null,
    imageKey: data.postImageKey || null,
    likes: data.likeCount,
    isLiked: false, // 상세 조회에서는 기본 false (추후 좋아요 여부 추가 가능)
    comments: data.commentCount,
    tags: [`#${mapTagIdToName(data.tagId)}`], // 태그 ID → 이름 매핑
    likers: [], // 상세조회에서는 따로 likers 정보 없음
    commentsList: [], // 상세조회에서는 따로 commentsList 없음
    createdAt: data.createdAt,
  };
}

/**
 * 🧩 태그 ID → 태그 이름 매핑 함수
 */
function mapTagIdToName(tagId: number) {
  const TAG_ID_TO_NAME: Record<number, string> = {
    1: "이직",
    2: "연봉",
    3: "면접",
    4: "취업",
    5: "자기소개서",
    6: "커리어",
    7: "자격증",
  };
  return TAG_ID_TO_NAME[tagId] || "기타";
}
