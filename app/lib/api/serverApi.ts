/**
 * サーバーサイドでバックエンドAPIと通信するためのクライアント
 * Server Componentsから使用することを想定
 */

// バックエンドAPIのベースURL（サーバーサイドでは環境変数から取得）
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/**
 * イベント検索用のパラメータ型定義
 */
export type EventSearchParams = {
  keyword?: string;
  startDate?: string;
  endDate?: string;
  categories?: string | string[];
  skills?: string | string[];
  location?: string;
  organizationId?: string;
};

/**
 * イベント一覧を取得する（サーバーサイド用）
 * @param eventType - フィルタリングするイベントタイプ（オプション）
 */
export async function getEvents(eventType?: string) {
  try {
    // クエリパラメータを構築
    const queryParams = new URLSearchParams();
    if (eventType && eventType !== 'all') {
      queryParams.append('eventType', eventType);
    }
    
    // クエリパラメータがある場合はURLに追加
    const url = `${API_BASE_URL}/events${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
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

/**
 * イベントを検索する（サーバーサイド用）
 * @param params 検索パラメータ
 */
export async function searchEvents(params: EventSearchParams) {
  try {
    // URLSearchParamsを使用してクエリパラメータを構築
    const searchParams = new URLSearchParams();

    // 各パラメータを追加
    if (params.keyword) searchParams.append("keyword", params.keyword);
    if (params.startDate) searchParams.append("startDate", params.startDate);
    if (params.endDate) searchParams.append("endDate", params.endDate);
    if (params.location) searchParams.append("location", params.location);
    if (params.organizationId)
      searchParams.append("organizationId", params.organizationId);

    // 配列パラメータの処理
    if (params.categories) {
      const categories = Array.isArray(params.categories)
        ? params.categories
        : [params.categories];
      categories.forEach((category) =>
        searchParams.append("categories", category)
      );
    }

    if (params.skills) {
      const skills = Array.isArray(params.skills)
        ? params.skills
        : [params.skills];
      skills.forEach((skill) => searchParams.append("skills", skill));
    }

    // APIリクエストを実行
    const response = await fetch(
      `${API_BASE_URL}/events/search?${searchParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // キャッシュを無効化（常に最新データを取得）
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result.success ? { data: result.data, count: result.count } : result;
  } catch (error) {
    console.error("Error searching events:", error);
    throw error;
  }
}

/**
 * イベント更新用のデータ型
 */
export interface EventUpdateData {
  title?: string;
  description?: string;
  eventDate?: string | Date;
  startTime?: string;
  endTime?: string;
  venue?: string;
  address?: string;
  location?: string;
  detailUrl?: string;
  image?: string;
  organizationId?: string;
  format?: string;
  difficulty?: string;
  price?: number;
  eventType?: string;
  skills?: { name: string }[];
  categories?: { categoryId: string }[];
  speakers?: { speakerId: string }[];
}

/**
 * イベントを更新する（サーバーサイド用）
 * @param id イベントID
 * @param eventData 更新するイベントデータ
 */
export async function updateEvent(id: string, eventData: EventUpdateData) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
      // キャッシュを無効化（常に最新データを取得）
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const result = await response.json();
    return result.success ? result.data : result;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
}

/**
 * カテゴリ一覧を取得する（サーバーサイド用）
 */
export async function getCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
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
    console.error("Error fetching categories:", error);
    throw error;
  }
}
