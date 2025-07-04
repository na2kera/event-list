import Link from "next/link";
import { Event } from "@/types";
import { BookmarkButton } from "./BookmarkButton";
import Image from "next/image";

interface EventCardProps {
  event: Event;
  isBookmarked?: boolean;
  recommendReason?: string;
}

export function EventCard({
  event,
  isBookmarked = false,
  recommendReason,
}: EventCardProps) {
  // 日付と時間を組み合わせてフォーマットする関数
  const formatDateTime = (date: Date | string | undefined, time?: string) => {
    // dateが存在しない場合は「日時未定」を返す
    if (!date) return "日時未定";

    // dateが文字列の場合はDateオブジェクトに変換
    const baseDate = typeof date === "string" ? new Date(date) : date;

    // 無効な日付の場合は「日時未定」を返す
    if (isNaN(baseDate.getTime())) return "日時未定";

    if (!time) return baseDate.toLocaleDateString();

    const [hours, minutes] = time.split(":");
    baseDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(baseDate);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full ${
        isBookmarked ? "border-indigo-300" : ""
      }`}
    >
      <div className="relative w-full h-48">
        <Image
          src={
            event.image ||
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
          }
          alt={event.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        <div className="absolute top-2 right-2">
          {event?.id && (
            <BookmarkButton eventId={event.id} isBookmarked={isBookmarked} />
          )}
        </div>
      </div>
      <div className="p-5 flex-grow">
        <div className="flex items-center mb-3">
          <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full font-medium">
            {event?.organization?.name}
          </span>
          <span
            className={`ml-2 inline-block text-xs px-2 py-1 rounded-full font-medium ${
              event?.difficulty === "BEGINNER"
                ? "bg-green-50 text-green-700"
                : event?.difficulty === "INTERMEDIATE"
                ? "bg-yellow-50 text-yellow-700"
                : event?.difficulty === "ADVANCED"
                ? "bg-red-50 text-red-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {event?.difficulty === "BEGINNER"
              ? "初心者向け"
              : event?.difficulty === "INTERMEDIATE"
              ? "中級者向け"
              : event?.difficulty === "ADVANCED"
              ? "上級者向け"
              : "全ての方向け"}
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
              {formatDateTime(event.eventDate, event.startTime)}
              {event.endTime && event.eventDate && (
                <> 〜 {formatDateTime(event.eventDate, event.endTime)}</>
              )}
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

        {/* event.description && (
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
            {event.description}
          </p>
        ) */}

        {recommendReason && (
          <div className="mb-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <div className="flex items-start">
              <span className="text-indigo-600 mr-2 mt-0.5">💡</span>
              <div>
                <p className="text-xs font-medium text-indigo-700 mb-1">
                  レコメンド理由
                </p>
                <p className="text-sm text-indigo-600">{recommendReason}</p>
              </div>
            </div>
          </div>
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
