import { EventDiscovery } from "components/events/EventDiscovery";
import { getEvents, getUserBookmarks } from "lib/api/server.ts/serverApi";
import { Suspense } from "react";
import { Event } from "@/types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { Header } from "components/layout/Header";

export const metadata = {
  title: "イベント一覧 | イベント管理アプリ",
  description: "技術イベント・勉強会の一覧ページです。",
};

interface Bookmark {
  eventId: string;
}

type SearchParams = {
  type?: string;
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  try {
    const { type } = await searchParams;
    const eventType = type || "all";

    const japaneseEventType =
      eventType === "hackathon"
        ? "ハッカソン"
        : eventType === "workshop"
        ? "ワークショップ"
        : eventType === "contest"
        ? "コンテスト"
        : undefined;

    const rawEventsData = (await getEvents(japaneseEventType)) as (Event & {
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

    const session = await getServerSession(authOptions);
    let bookmarkedEventIds: string[] = [];

    if (session?.user?.id) {
      const bookmarks = await getUserBookmarks(session.user.id);
      bookmarkedEventIds = bookmarks.map(
        (bookmark: Bookmark) => bookmark.eventId
      );
    }

    const eventsData = rawEventsData.map((event) => ({
      ...event,
      isBookmarked: bookmarkedEventIds.includes(event.id),
    }));

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          }
        >
          <EventDiscovery events={eventsData} initialType={eventType} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error fetching events:", error);
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            イベントを探す
          </h1>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md my-6">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <p>
                イベント情報の取得に失敗しました。しばらく経ってから再度お試しください。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
