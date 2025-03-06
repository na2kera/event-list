import Link from "next/link";
import { Event } from "@/app/types";

type EventWithOrganization = Event & {
  organization: {
    name: string;
  };
};

interface EventCardProps {
  event: EventWithOrganization;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <Link href={`/events/${event.id}`}>
        <h3 className="text-xl font-semibold mb-2 hover:text-blue-600">
          {event.title}
        </h3>
      </Link>
      <p className="text-gray-600 mb-2">{event.organization.name}</p>
      <p className="text-sm text-gray-500 mb-2">
        {new Date(event.startDateTime).toLocaleString("ja-JP")}
        {event.endDateTime && (
          <> 〜 {new Date(event.endDateTime).toLocaleString("ja-JP")}</>
        )}
      </p>
      {event.location && (
        <p className="text-sm text-gray-500 mb-2">場所: {event.location}</p>
      )}
      {event.description && (
        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
          {event.description}
        </p>
      )}
      {event.detailUrl && (
        <a
          href={event.detailUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 text-sm"
        >
          外部リンク →
        </a>
      )}
    </div>
  );
}
