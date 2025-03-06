"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { EventDetail } from "./EventDetail";

export function EventDetailClient({ eventId }: { eventId: string }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (!session) {
    redirect("/");
  }

  return <EventDetail eventId={eventId} />;
}
