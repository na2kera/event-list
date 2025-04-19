import { Container } from "@/components/layout/Container";
import { EventDetailClient } from "@/components/events/EventDetailClient";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/Header";

// バックエンドAPIのベースURL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    // サーバーサイドでデータフェッチを行う
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
    const eventData = result.success ? result.data : result;

    if (!eventData) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Container>
          <EventDetailClient eventId={id} eventData={eventData} />
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    notFound();
  }
}
