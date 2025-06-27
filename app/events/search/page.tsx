import { EventSearch } from "components/events/EventSearch";
import { Suspense } from "react";
import { getEvents } from "lib/api/server.ts/serverApi";
import { Header } from "components/layout/Header";

export const metadata = {
  title: "イベント検索 | イベント管理アプリ",
  description: "技術イベント・勉強会を検索するページです。",
};

export default async function EventSearchPage() {
  try {
    // 初期表示用にすべてのイベントを取得
    const eventsData = await getEvents();

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
          <EventSearch initialEvents={eventsData} />
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
            イベントを検索
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
