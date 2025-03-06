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
  // 日付フォーマット関数
  const formatDate = (dateInput: string | Date) => {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full">
      <div className="p-5 flex-grow">
        <div className="flex items-center mb-3">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
            {event.organization.name}
          </span>
        </div>

        <Link href={`/events/${event.id}`}>
          <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-indigo-600 transition-colors line-clamp-2">
            {event.title}
          </h3>
        </Link>

        <div className="mb-4">
          <div className="flex items-center text-gray-600 mb-2">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-sm">
              {formatDate(event.startDateTime)}
              {event.endDateTime && <> 〜 {formatDate(event.endDateTime)}</>}
            </span>
          </div>

          {event.location && (
            <div className="flex items-center text-gray-600 mb-2">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              <span className="text-sm">{event.location}</span>
            </div>
          )}
        </div>

        {event.description && (
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
            {event.description}
          </p>
        )}
      </div>

      <div className="px-5 pb-5 pt-2 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <Link
            href={`/events/${event.id}`}
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
          >
            詳細を見る →
          </Link>

          {event.detailUrl && (
            <a
              href={event.detailUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center transition-colors"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                ></path>
              </svg>
              外部リンク
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
