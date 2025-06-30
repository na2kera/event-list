import { Sparkles } from "lucide-react";
import { TechFieldSelector } from "./TechFieldSelector";

interface RecommendHeaderProps {
  onFieldSelect: (field: string) => void;
}

export function RecommendHeader({ onFieldSelect }: RecommendHeaderProps) {
  return (
    <div className="text-center mb-12">
      <Sparkles className="h-12 w-12 text-indigo-600 mx-auto mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        あなたにおすすめの
        <span className="text-indigo-600">イベント</span>
      </h1>
      {/* 技術分野選択 */}
      <TechFieldSelector onFieldSelect={onFieldSelect} />
    </div>
  );
}
