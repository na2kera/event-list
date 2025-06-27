import { Container } from "components/layout/Container";
import { notFound } from "next/navigation";
import {
  getEventById,
  getCategories,
  getSpeakers,
} from "lib/api/server.ts/serverApi";
import { EventEditForm } from "components/events/EventEditForm";
import { Header } from "components/layout/Header";

export default async function EventEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    // サーバーサイドでイベントデータ、カテゴリ一覧、スピーカー一覧を並行して取得
    const [eventData, categories, speakers] = await Promise.all([
      getEventById(id),
      getCategories(),
      getSpeakers(),
    ]);

    if (!eventData) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Container>
          <div className="py-8">
            <h1 className="text-2xl font-bold mb-6">イベント編集</h1>
            <EventEditForm
              eventId={id}
              initialEventData={eventData}
              categories={categories}
              speakers={speakers}
            />
          </div>
        </Container>
      </div>
    );
  } catch (error) {
    console.error("Error fetching event for editing:", error);
    notFound();
  }
}
