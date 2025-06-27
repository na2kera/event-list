import React from "react";
import { Calendar } from "lucide-react";

export function Header() {
  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-500/20 rounded-full mb-6">
          <Calendar className="h-8 w-8 text-indigo-300" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          テックイベント推薦システム
        </h1>
        <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
          最新の技術イベントを見つけましょう。
          興味のある技術分野やキーワードを教えてください。
        </p>
      </div>
    </div>
  );
}
