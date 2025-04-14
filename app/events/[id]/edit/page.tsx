import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/layout/Container";
import { notFound } from "next/navigation";
import { getEventById, getCategories } from "@/lib/api/serverApi";
import { EventEditForm } from "@/components/events/EventEditForm";

export default async function EventEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    // サーバーサイドでイベントデータとカテゴリ一覧を並行して取得
    const [eventData, categories] = await Promise.all([
      getEventById(id),
      getCategories()
    ]);

    if (!eventData) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Container>
          <div className="py-8">
            <h1 className="text-2xl font-bold mb-6">イベント編集</h1>
            <EventEditForm 
              eventId={id} 
              initialEventData={eventData} 
              categories={categories} 
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
