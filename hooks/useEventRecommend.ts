import { useState } from "react";
import { useSession } from "next-auth/react";
import { RecommendedEvent } from "types/recommend";

export const useEventRecommend = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<RecommendedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendedEvents = async () => {
    if (!session?.user?.id) {
      setError("ログインが必要です");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // フロント環境変数からベースURLを取得し、バックエンドの /recommend/user エンドポイントを呼び出す
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

      const response = await fetch(`${API_BASE_URL}/recommend/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session.user.id }),
      });

      if (!response.ok) {
        throw new Error("レコメンドの取得に失敗しました");
      }

      const result = await response.json();

      if (result.success) {
        setEvents(result.data || []);
      } else {
        throw new Error(result.error || "レコメンドの取得に失敗しました");
      }
    } catch (error) {
      console.error("Error fetching recommended events:", error);
      setError(error instanceof Error ? error.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    events,
    isLoading,
    error,
    fetchRecommendedEvents,
  };
};
