"use client";

import { EventDetail } from "./EventDetail";
import { Event, Speaker, Category } from "@/types";

interface EventDetailClientProps {
  eventId: string;
  eventData: Event & {
    organization: { name: string };
    speakers: {
      speaker: Speaker;
    }[];
    skills: { name: string }[];
    categories: {
      category: Category;
    }[];
  };
}

export function EventDetailClient({ eventId, eventData }: EventDetailClientProps) {
  return <EventDetail eventId={eventId} initialEventData={eventData} />;
}
