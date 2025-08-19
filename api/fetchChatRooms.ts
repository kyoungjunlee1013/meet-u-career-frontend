import { apiClient } from "@/api/apiClient";

// [ADDED] 타입 명시(원하는 구조에 맞게 조정)
export interface ChatRoomDto {
  roomId: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

// [CHANGED] AbortSignal 옵션 지원(원하면 호출부에서 취소 가능)
export async function fetchChatRooms(signal?: AbortSignal): Promise<ChatRoomDto[]> {
  try {
    const res = await apiClient.get<{ data: ChatRoomDto[] }>("/api/chat/rooms", {
      signal: signal as any,
    });
    return res.data?.data ?? [];
  } catch (error) {
    // [CHANGED] 취소는 조용히 전파
    // @ts-ignore
    if (error?.name === "CanceledError" || error?.code === "ERR_CANCELED") throw error;
    console.error("채팅방 목록 불러오기 실패", error);
    throw error;
  }
}
