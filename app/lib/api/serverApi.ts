/**
 * サーバーサイドでバックエンドAPIと通信するためのクライアント
 * Server Componentsから使用することを想定
 */

// バックエンドAPIのベースURL（サーバーサイドでは環境変数から取得）
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001/api";

/**
 * イベント一覧を取得する（サーバーサイド用）
 */
export async function getEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/events`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // キャッシュを無効化（常に最新データを取得）
      cache: "no-store",
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
 * イベント詳細を取得する（サーバーサイド用）
 * @param id イベントID
 */
export async function getEventById(id: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // キャッシュを無効化（常に最新データを取得）
      cache: "no-store",
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
