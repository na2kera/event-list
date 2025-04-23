import { Hero } from "./components/Hero";
import { getEvents, getUserProfile } from "@/lib/api/serverApi";
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
    console.log("===== Homepage Session Info =====");
    console.log("Session Object:", JSON.stringify(session, null, 2));
    console.log("Session User ID:", session?.user?.id);
    console.log("===============================");
    let bookmarkedEventIds: string[] = [];

    if (session?.user?.id) {
      console.log("Fetching bookmarks for user:", session.user.id);
      const bookmarks = await getUserBookmarks(session.user.id);
      bookmarkedEventIds = bookmarks.map(
        (bookmark: Bookmark) => bookmark.eventId
      );
    } else {
      console.log("User session or ID not found on homepage.");
    }

    const recentEvents = eventsData.slice(0, 3).map((event) => ({
      ...event,
      isBookmarked: bookmarkedEventIds.includes(event.id),
    }));

    let userProfile = null;
    if (session?.user?.id) {
      userProfile = await getUserProfile(session.user.id);
    }

    return (
      <div className="min-h-screen bg-white">
        <Hero
          recentEvents={recentEvents}
          userProfile={userProfile}
          session={session ?? undefined}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data for homepage:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }

    // エラーが発生した場合でもHeroコンポーネントを表示（イベントデータなし）
    return (
      <div className="min-h-screen bg-white">
        <Hero recentEvents={[]} />
      </div>
    );
  }
}
