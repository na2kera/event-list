import { Target } from "lucide-react";
import { EventList } from "components/events/EventList";
import { RecommendedEvent } from "types/recommend";

interface ResultsSectionProps {
  events: RecommendedEvent[];
  eventsCount: number;
  rawRecommendData: {
    tag: string;
    recommendations: { event: RecommendedEvent }[];
  }[];
}

export function ResultsSection({
  events,
  eventsCount,
  rawRecommendData,
}: ResultsSectionProps) {
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

      {/* タグごとにイベント一覧を表示 */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 space-y-8">
        {rawRecommendData.length > 0 ? (
          rawRecommendData.map((tagGroup) => (
            <div key={tagGroup.tag} className="mb-8">
              <h3 className="text-xl font-bold text-indigo-700 mb-4">
                {tagGroup.tag} のおすすめ
              </h3>
              <EventList
                events={tagGroup.recommendations.map((rec) => rec.event)}
              />
            </div>
          ))
        ) : (
          <EventList events={events} />
        )}
      </div>
    </div>
  );
}
