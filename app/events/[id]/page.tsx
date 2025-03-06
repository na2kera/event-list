"use client";

import { useSession } from "next-auth/react";
import { Navbar } from "@/app/components/layout/Navbar";
import { Container } from "@/app/components/layout/Container";
import { EventDetail } from "@/app/components/events/EventDetail";
import { redirect } from "next/navigation";

export default function EventPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Container>
        <EventDetail eventId={params.id} />
      </Container>
    </div>
  );
}
