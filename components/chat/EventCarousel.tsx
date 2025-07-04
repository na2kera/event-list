import React from "react";
import { Event } from "@/types";
import { EventCard } from "../events/EventCard";

interface EventCarouselProps {
  events: Event[];
  title?: string;
  recommendReasons?: string[];
}

export function EventCarousel({
  events,
  title = "おすすめイベント",
  recommendReasons,
}: EventCarouselProps) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <span className="mr-2">🎯</span>
        {title}
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {events.map((event, index) => {
          // 画像がない場合はUnsplashの画像を設定
          const eventWithImage = {
            ...event,
            image:
              event.image ||
              "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
          };

          return (
            <div key={event.id} className="flex-shrink-0 w-80">
              <EventCard
                event={eventWithImage}
                recommendReason={recommendReasons?.[index]}
              />
            </div>
          );
        })}
      </div>
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
