import { Hero } from "./components/Hero";
import { getEvents } from "@/lib/api/serverApi";
import { Event } from "@/types";
import { getServerSession } from "next-auth";
import { getUserBookmarks } from "@/lib/api/serverApi";
import { authOptions } from "./lib/auth";

interface Bookmark {
  eventId: string;
}

export default async function Home() {
  try {
    // サーバーサイドでイベントデータを取得
    const eventsData = (await getEvents()) as (Event & {
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
    })[];

    // ユーザーのブックマーク情報を取得
    const session = await getServerSession(authOptions);
    let bookmarkedEventIds: string[] = [];

    if (session?.user?.id) {
      const bookmarks = await getUserBookmarks(session.user.id);
      bookmarkedEventIds = bookmarks.map(
        (bookmark: Bookmark) => bookmark.eventId
      );
    }

    const recentEvents = eventsData.slice(0, 3).map((event) => ({
      ...event,
      isBookmarked: bookmarkedEventIds.includes(event.id),
    }));

    return (
      <div className="min-h-screen bg-white">
        <Hero recentEvents={recentEvents} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching events for homepage:", error);

    // エラーが発生した場合でもHeroコンポーネントを表示（イベントデータなし）
    return (
      <div className="min-h-screen bg-white">
        <Hero />
      </div>
    );
  }
}
