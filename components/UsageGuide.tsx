import React from "react";
import { searchExamples } from "../constants/techCategories";

export function UsageGuide() {
  return (
    <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          テックイベント検索の使い方
        </h2>
        <p className="text-indigo-200">以下のような条件で検索できます</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {searchExamples.map((example) => (
          <div key={example.id} className="text-center">
            <div className="text-3xl mb-3">{example.icon}</div>
            <h3 className="text-white font-semibold mb-2">{example.title}</h3>
            <p className="text-indigo-200 text-sm">{example.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
