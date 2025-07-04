import { Sparkles } from "lucide-react";

export function RecommendHeader() {
  return (
    <div className="text-center mb-12">
      <Sparkles className="h-12 w-12 text-indigo-600 mx-auto mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        あなたにおすすめの
        <span className="text-indigo-600">イベント</span>
      </h1>
    </div>
  );
}
