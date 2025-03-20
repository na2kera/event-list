"use client";

import { Calendar, Users, MapPin } from "lucide-react";
import Button from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (time: string) => {
    return time.replace(/^(\d{2}):(\d{2})$/, "$1時$2分");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow flex flex-col h-full">
      <img
        src={
          event.image ||
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
        }
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex flex-col flex-grow">
        {/* カテゴリー */}
        {event.categories && event.categories.length > 0 && (
          <div className="flex gap-2 mb-3">
            {event.categories.map((category) => (
              <Badge key={category.id} variant="secondary">
                {category.name}
              </Badge>
            ))}
          </div>
        )}

        {/* 日時 */}
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span>
            {formatDate(event.eventDate.toString())}{" "}
            {formatTime(event.startTime || "")}〜
            {formatTime(event.endTime || "")}
          </span>
        </div>

        {/* 会場 */}
        {event.venue && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="h-4 w-4 mr-2" />
            {event.venue}
          </div>
        )}

        {/* タイトル */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>

        {/* 説明文 */}
        {event.description && (
          <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
        )}

        {/* 残り枠数表示 */}
        {event.spots !== undefined && (
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Users className="h-4 w-4 mr-2" />
            残り{event.spots}枠
          </div>
        )}

        {/* 主催者情報 */}
        {event.organization && (
          <div className="flex items-center mb-4">
            {event.organization.logo && (
              <img
                src={event.organization.logo}
                alt={event.organization.name}
                className="w-6 h-6 rounded-full mr-2"
              />
            )}
            <span className="text-sm text-gray-600">
              {event.organization.name}
            </span>
          </div>
        )}

        {/* 登壇者情報 */}
        {event.speakers && event.speakers.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            {event.speakers.map((speaker) => (
              <div key={speaker.id} className="flex items-center">
                {speaker.avatar && (
                  <img
                    src={speaker.avatar}
                    alt={speaker.name}
                    className="w-6 h-6 rounded-full mr-1"
                  />
                )}
                <span className="text-sm text-gray-600">{speaker.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* ボタン */}
        <div className="mt-auto">
          <Button
            variant="default"
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
          >
            詳細を見る
          </Button>
        </div>
      </div>
    </div>
  );
}
