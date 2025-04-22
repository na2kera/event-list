"use client";

import { useSession } from "next-auth/react";
import { EventCard } from "../events/EventCard";
import { Bookmark } from "@/types";

interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">ログインが必要です</p>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">ブックマークしたイベントはありません</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarks.map((bookmark) => {
        return (
          <EventCard
            key={bookmark.id}
            event={bookmark.Event}
            isBookmarked={true}
          />
        );
      })}
    </div>
  );
}
