import React from "react";
import {
  Users,
  MessageSquare,
  TrendingUp,
  Code,
  Briefcase,
} from "lucide-react";
import { ColumnCard } from "@/components/columns/ColumnCard";
import { EventList } from "./events/EventList";

export function Hero() {
  return (
    <>
      {/* メインヒーローセクション */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              次の成長チャンス、見逃していませんか？
            </h1>
            <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
              このイベントが、あなたの未来を変えるかもしれない。
              エンジニアとしての成長を加速させる、特別な機会をお見逃しなく。
            </p>
            {/* <Button
              variant="default"
              size="lg"
              className="inline-flex items-center rounded-full text-indigo-600 hover:bg-indigo-50"
            >
              <Rocket className="h-5 w-5 mr-2" />
              成長のきっかけを掴む
            </Button> */}
          </div>
        </div>
      </div>

      {/* 成長目標セクション */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            あなたは何を成長させたいですか？
          </h2>
          <p className="text-lg text-gray-600">
            目標に合わせて、最適な成長機会をご提案します
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {growthGoals.map((goal) => {
            const Icon = goal.icon;
            return (
              <button
                key={goal.id}
                className="p-8 rounded-2xl border-2 border-gray-200 hover:border-indigo-200 hover:bg-gray-50 transition-all"
              >
                <div className="rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto bg-indigo-100">
                  <Icon className="h-8 w-8 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {goal.title}
                </h3>
                <p className="text-gray-600">{goal.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 直近開催イベント */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            直近の開催イベント
          </h2>
          <button className="text-indigo-600 hover:text-indigo-800 font-medium">
            すべてのイベントを見る →
          </button>
        </div>
        <EventList />
      </div>

      {/* エンジニア成長コラム */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              エンジニア成長コラム
            </h2>
            <button className="text-indigo-600 hover:text-indigo-800 font-medium">
              すべての記事を見る →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {columns.map((column) => (
              <ColumnCard key={column.id} column={column} />
            ))}
          </div>
        </div>
      </div>

      {/* AIキャリアサポート */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              AIがあなたの成長をサポート
            </h2>
            <p className="text-indigo-200 text-lg mb-6">
              キャリアプランの相談から、スキルアップのアドバイスまで。
              AIキャリアアドバイザーが24時間体制でサポートします。
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors font-medium">
              <MessageSquare className="h-5 w-5 mr-2" />
              AIアドバイザーに相談する
            </button>
          </div>
          <div className="flex-shrink-0">
            <TrendingUp className="h-32 w-32 text-white opacity-80" />
          </div>
        </div>
      </div>
    </>
  );
}

const growthGoals = [
  {
    id: "skills",
    title: "スキルを伸ばしたい",
    description: "新しい言語やツールの習得、技術力の向上",
    icon: Code,
  },
  {
    id: "team",
    title: "チーム開発を経験したい",
    description: "実践的なチーム開発でスキルアップ",
    icon: Users,
  },
  {
    id: "portfolio",
    title: "ポートフォリオを作りたい",
    description: "就活に活かせる実績づくり",
    icon: Briefcase,
  },
];

const columns = [
  {
    id: 1,
    title: "エンジニアのキャリアパス設計術",
    excerpt: "技術力とビジネス視点のバランスが重要な理由とは？",
  },
  {
    id: 2,
    title: "効果的なポートフォリオの作り方",
    excerpt: "採用担当者の心をつかむポートフォリオの3つの要素",
  },
  {
    id: 3,
    title: "ハッカソンに出るロードマップ",
    excerpt: "ハッカソンに出るために必要なスキルやおすすめイベントについて",
  },
  {
    id: 4,
    title: "最新技術キャッチアップ戦略",
    excerpt: "膨大な情報から本当に必要な技術を見極めるコツ",
  },
];
