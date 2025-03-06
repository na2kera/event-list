"use client";

import { useEffect, useState } from "react";
import { Event } from "@/app/types";
import Link from "next/link";

interface EventDetailProps {
  eventId: string;
}

export function EventDetail({ eventId }: EventDetailProps) {
  const [event, setEvent] = useState<
    Event & { organization: { name: string } }
  >();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) throw new Error("Failed to fetch event");
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        setError("イベントの取得に失敗しました");
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !event) {
    return (
      <div className="text-red-500">{error || "イベントが見つかりません"}</div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
          ← イベント一覧に戻る
        </Link>
      </div>
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">主催団体</h2>
          <p className="text-gray-700">{event.organization.name}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">日時</h2>
          <p className="text-gray-700">
            {new Date(event.startDateTime).toLocaleString("ja-JP")}
            {event.endDateTime && (
              <>
                <br />〜 {new Date(event.endDateTime).toLocaleString("ja-JP")}
              </>
            )}
          </p>
        </div>
        {event.location && (
          <div>
            <h2 className="text-xl font-semibold mb-2">場所</h2>
            <p className="text-gray-700">{event.location}</p>
          </div>
        )}
        {event.description && (
          <div>
            <h2 className="text-xl font-semibold mb-2">説明</h2>
            <p className="text-gray-700 whitespace-pre-wrap">
              {event.description}
            </p>
          </div>
        )}
        {event.detailUrl && (
          <div>
            <h2 className="text-xl font-semibold mb-2">外部リンク</h2>
            <a
              href={event.detailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              詳細を見る →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
