import { useState } from "react";
import { Event } from "@/types";
import { useSession } from "next-auth/react";

type RecommendedEvent = Event & {
  organization: { name: string; id: string; logo?: string };
  speakers: {
    speaker: {
      id: string;
      name: string;
      occupation: string;
      affiliation: string;
      bio: string;
    };
  }[];
  skills: { id: string; name: string }[];
  categories: {
    category: { id: string; name: string };
  }[];
  isBookmarked?: boolean;
};

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
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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
