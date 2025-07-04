import { Sparkles } from "lucide-react";
import { TechFieldSelector } from "./TechFieldSelector";

interface RecommendHeaderProps {
  onFieldSelect: (field: string) => void;
  onReloadRecommend: () => void;
}

export function RecommendHeader({
  onFieldSelect,
  onReloadRecommend,
}: RecommendHeaderProps) {
  return (
    <div className="text-center mb-12">
      <Sparkles className="h-12 w-12 text-indigo-600 mx-auto mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        あなたにおすすめの
        <span className="text-indigo-600">イベント</span>
      </h1>
      {/* 技術分野選択 */}
      <TechFieldSelector onFieldSelect={onFieldSelect} />
      {/* 最新取得ボタン */}
      <button
        className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        onClick={onReloadRecommend}
      >
        最新のおすすめを取得
      </button>
    </div>
  );
}
