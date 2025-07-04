import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { RecommendedEvent } from "types/recommend";

export const useEventRecommend = () => {
  const { data: session } = useSession();
  const [events, setEvents] = useState<RecommendedEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawRecommendData, setRawRecommendData] = useState<
    {
      tag: string;
      recommendations: { event: RecommendedEvent }[];
    }[]
  >([]);

  const CACHE_TTL = 5 * 60 * 60 * 1000; // 5時間

  const fetchRecommendedEvents = async () => {
    if (!session?.user?.id) {
      setError("ログインが必要です");
      return;
    }

    const cacheKey = `recommend_cache_${session.user.id}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          setRawRecommendData(parsed.data || []);
          const flatEvents = (parsed.data || []).flatMap(
            (tagObj: { recommendations?: { event: RecommendedEvent }[] }) =>
              tagObj.recommendations?.map((rec) => rec.event) || []
          );
          setEvents(flatEvents);
          setIsLoading(false);
          return;
        }
      } catch {
        // パース失敗時は無視してAPI取得
      }
    }

    setIsLoading(true);
    setError(null);

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
      console.log("API_BASE_URL", API_BASE_URL);
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
      console.log("result", result);

      if (result.success) {
        setRawRecommendData(result.data || []);
        const flatEvents = (result.data || []).flatMap(
          (tagObj: { recommendations?: { event: RecommendedEvent }[] }) =>
            tagObj.recommendations?.map((rec) => rec.event) || []
        );
        setEvents(flatEvents);
        // キャッシュ保存
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: result.data, timestamp: Date.now() })
        );
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

  // キャッシュを無視してAPIリクエストを送る関数
  const fetchRecommendedEventsNoCache = async () => {
    if (!session?.user?.id) {
      setError("ログインが必要です");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
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
        setRawRecommendData(result.data || []);
        const flatEvents = (result.data || []).flatMap(
          (tagObj: { recommendations?: { event: RecommendedEvent }[] }) =>
            tagObj.recommendations?.map((rec) => rec.event) || []
        );
        setEvents(flatEvents);
        // キャッシュも上書き
        const cacheKey = `recommend_cache_${session.user.id}`;
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: result.data, timestamp: Date.now() })
        );
      } else {
        throw new Error(result.error || "レコメンドの取得に失敗しました");
      }
    } catch (error) {
      console.error("Error fetching recommended events (no cache):", error);
      setError(error instanceof Error ? error.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  // 画面初回マウント時に自動取得
  useEffect(() => {
    fetchRecommendedEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user?.id]);

  return {
    events,
    isLoading,
    error,
    fetchRecommendedEvents,
    fetchRecommendedEventsNoCache,
    rawRecommendData,
  };
};
