/**
 * バックエンドAPIとの通信を行うクライアント
 */

// バックエンドAPIのベースURL（開発環境では3001ポートを使用）
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api";

/**
 * イベント一覧を取得する
 */
export async function fetchEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result.success ? result.data : result;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
}

/**
 * イベント詳細を取得する
 * @param id イベントID
 */
export async function fetchEventById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result.success ? result.data : result;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
}
