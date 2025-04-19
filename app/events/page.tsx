"use client";

import { Navbar } from "@/components/layout/Navbar";
import { EventDiscovery } from "@/components/events/EventDiscovery";
import { getEvents } from "@/lib/api/serverApi";
import { Suspense, useEffect, useState } from "react";
import { Event } from "@/types";
import { useSearchParams } from "next/navigation";

// クライアントコンポーネントではmetadataをエクスポートできないため削除

// 実際のコンテンツを表示するクライアントコンポーネント
function EventsContent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        // イベントデータを取得
        const fetchedEvents = await getEvents();
        setEvents(fetchedEvents);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("イベントデータの取得中にエラーが発生しました");
        setLoading(false);
      }
    }

    fetchEvents();
  }, [searchParams]);

  // URLパラメータからイベントタイプを取得
  const type = searchParams?.get("type") || "all";
  const eventType = type || "all";

  // イベントタイプに基づいて表示名を設定
  const japaneseEventType =
    eventType === "hackathon"
      ? "ハッカソン"
      : eventType === "workshop"
      ? "ワークショップ"
      : eventType === "seminar"
      ? "セミナー"
      : eventType === "conference"
      ? "カンファレンス"
      : "すべての";

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">読み込み中...</h1>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">
            エラーが発生しました
          </h1>
          <p className="text-center text-red-500">
            {error}。しばらくしてからもう一度お試しください。
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          {japaneseEventType}イベント一覧
        </h1>
        <EventDiscovery events={events} />
      </main>
    </div>
  );
}

// メインのページコンポーネント - Suspenseでラップする
export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <EventsContent />
    </Suspense>
  );
}
