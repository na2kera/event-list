"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getUserBookmarks } from "@/lib/api/bookmarkApi";
import { Event } from "@/types";
import { EventCard } from "../events/EventCard";
import { Skeleton } from "../ui/skeleton";

interface Bookmark {
  id: string;
  eventId: string;
  userId: string;
  event: Event;
}

export function BookmarkList() {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!session?.user?.id) return;

      try {
        const data = await getUserBookmarks(session.user.id);
        setBookmarks(data);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, [session?.user?.id]);

  if (!session) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">ログインが必要です</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-[300px] rounded-lg" />
        ))}
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
      {bookmarks.map((bookmark) => (
        <EventCard
          key={bookmark.id}
          event={bookmark.event}
          isBookmarked={true}
        />
      ))}
    </div>
  );
}
