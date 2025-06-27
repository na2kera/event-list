import { Target } from "lucide-react";
import { EventList } from "components/events/EventList";
import { RecommendedEvent } from "types/recommend";

interface ResultsSectionProps {
  events: RecommendedEvent[];
  eventsCount: number;
}

export function ResultsSection({ events, eventsCount }: ResultsSectionProps) {
  return (
    <div className="space-y-8">
      {/* 結果ヘッダー */}
      <div className="text-center bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <Target className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          レコメンド結果
        </h2>
        <p className="text-lg text-gray-600">
          あなたにぴったりの{" "}
          <span className="font-semibold text-indigo-600">{eventsCount}件</span>{" "}
          のイベントが見つかりました
        </p>
      </div>

      {/* イベント一覧 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <EventList events={events} />
      </div>
    </div>
  );
}
