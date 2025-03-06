import { Navbar } from "@/app/components/layout/Navbar";
import { Container } from "@/app/components/layout/Container";
import { EventDetailClient } from "@/app/components/events/EventDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Container>
        <EventDetailClient eventId={id} />
      </Container>
    </div>
  );
}
