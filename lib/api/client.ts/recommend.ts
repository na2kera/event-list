import { Event } from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/**
 * チャットメッセージからイベントをレコメンド
 * @param message ユーザーが入力した検索・要望メッセージ
 * @param userId  オプション：ユーザーID（ログイン時）
 */
export async function fetchEventRecommendations(
  message: string,
  userId?: string
): Promise<{ query: string; recommendations: Event[] }> {
  try {
    const response = await fetch(`${API_BASE_URL}/recommend/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, userId }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
    // バックエンドは { query, recommendations } 形式で返却する想定
    return result;
  } catch (error) {
    console.error("Error fetching event recommendations:", error);
    throw error;
  }
}
