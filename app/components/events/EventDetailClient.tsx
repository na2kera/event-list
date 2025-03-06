"use client";

import { EventDetail } from "./EventDetail";

export function EventDetailClient({ eventId }: { eventId: string }) {
  return <EventDetail eventId={eventId} />;
}
