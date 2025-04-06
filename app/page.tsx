import { Hero } from "./components/Hero";
import { getEvents } from "@/lib/api/serverApi";
import { Event } from "@/types";

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

    // 最新の3件のみを表示
    const recentEvents = eventsData.slice(0, 3);

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
