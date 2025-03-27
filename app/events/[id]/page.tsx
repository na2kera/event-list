import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import { EventDetailClient } from "@/components/events/EventDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: { id: string };
}

// バックエンドAPIのベースURL
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001/api';

export default async function EventPage({ params }: PageProps) {
  const { id } = params;
  
  try {
    // サーバーサイドでデータフェッチを行う
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // キャッシュを無効化（常に最新データを取得）
      cache: 'no-store',
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
        <Navbar />
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
