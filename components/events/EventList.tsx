import { Event } from "@/types";
import { EventCard } from "./EventCard";

interface EventListProps {
  events?: (Event & {
    organization: { name: string };
    speakers: {
      speaker: {
        id: string;
        name: string;
        occupation: string;
        affiliation: string;
        bio: string;
      };
    }[];
    skills: { id: string; name: string }[];
    categories: {
      category: { id: string; name: string };
    }[];
    isBookmarked?: boolean;
  })[];
}

export function EventList({ events = [] }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-8 rounded-md flex flex-col items-center justify-center my-6">
        <svg
          className="w-12 h-12 mb-4 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          ></path>
        </svg>
        <p className="text-center text-lg font-medium">
          現在登録されているイベントはありません
        </p>
        <p className="text-center text-sm mt-2">
          新しいイベントが登録されるまでお待ちください
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event, idx) => (
          <EventCard
            key={event.id ? event.id : `event-${idx}`}
            event={event}
            isBookmarked={event.isBookmarked || false}
          />
        ))}
      </div>
    </div>
  );
}
