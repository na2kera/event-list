import { Sparkles } from "lucide-react";

interface RecommendHeaderProps {
  onRecommendClick: () => void;
  isLoading: boolean;
  hasEvents: boolean;
  hasError: boolean;
}

export function RecommendHeader({
  onRecommendClick,
  isLoading,
  hasEvents,
  hasError,
}: RecommendHeaderProps) {
  return (
    <div className="text-center mb-12">
      <Sparkles className="h-12 w-12 text-indigo-600 mx-auto mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        あなたにおすすめの
        <span className="text-indigo-600">イベント</span>
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
        AIがあなたのプロフィールを分析し、成長につながる最適なイベントを厳選してお届けします
      </p>

      {/* メインアクションボタン */}
      <div className="flex flex-col items-center gap-6">
        <button
          onClick={onRecommendClick}
          disabled={isLoading}
          className={`inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed text-white"
              : "bg-indigo-600 hover:bg-indigo-700 text-white transform hover:scale-105 hover:shadow-xl"
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              AI分析中...
            </>
          ) : (
            <>
              <Sparkles className="h-6 w-6" />
              おすすめイベントを取得
            </>
          )}
        </button>

        {!isLoading && !hasEvents && !hasError && (
          <p className="text-gray-500 text-lg">
            ボタンをクリックして、あなたにぴったりのイベントを見つけましょう
          </p>
        )}
      </div>
    </div>
  );
}
