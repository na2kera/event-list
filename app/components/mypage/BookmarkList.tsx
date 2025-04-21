"use client";

import { useSession } from "next-auth/react";
import { EventCard } from "../events/EventCard";
import { Bookmark } from "@/types";

interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  // 1. props受け取り直後
  console.log("[BookmarkList] props.bookmarks:", bookmarks);
  console.log("BookmarkList bookmarks:", bookmarks);
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">ログインが必要です</p>
      </div>
    );
  }

  // 2. map直前
  console.log("[BookmarkList] before map, bookmarks:", bookmarks);
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">ブックマークしたイベントはありません</p>
      </div>
    );
  }

  console.log(bookmarks);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarks.map((bookmark, idx) => {
        // 3. 各bookmarkの中身
        console.log(`[BookmarkList] bookmark[${idx}]:`, bookmark);
        // 4. EventCardに渡すeventの中身
        console.log(`[BookmarkList] bookmark[${idx}].event:`, bookmark.Event);
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
