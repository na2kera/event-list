// import React from "react";
// import {
//   Users,
//   MessageSquare,
//   TrendingUp,
//   Code,
//   Briefcase,
// } from "lucide-react";
// import { ColumnCard } from "@/components/columns/ColumnCard";
// import { EventList } from "./events/EventList";
// import { Event } from "@/types";
// import Link from "next/link";
// import { ClientProfilePopup } from "./ClientProfilePopup";
// import { ProfileData } from "./ProfilePopup";
// import { Session } from "next-auth";

// interface HeroProps {
//   recentEvents?: (Event & {
//     organization: { name: string };
//     speakers: {
//       speaker: {
//         id: string;
//         name: string;
//         occupation: string;
//         affiliation: string;
//         bio: string;
//       };
//     }[];
//     skills: { id: string; name: string }[];
//     categories: {
//       category: { id: string; name: string };
//     }[];
//   })[];
//   userProfile?: ProfileData;
//   session?: Session;
// }

// 既存のHero実装をコメントアウト
// export async function Hero({ recentEvents, userProfile, session }: HeroProps) {
//   // ... 既存の実装はすべてコメントアウト
// }

// 成長目標データもコメントアウト
// const growthGoals = [
//   {
//     id: "skills",
//     title: "スキルを伸ばしたい",
//     description: "新しい言語やツールの習得、技術力の向上",
//     icon: Code,
//   },
//   {
//     id: "team",
//     title: "チーム開発を経験したい",
//     description: "実践的なチーム開発でスキルアップ",
//     icon: Users,
//   },
//   {
//     id: "portfolio",
//     title: "ポートフォリオを作りたい",
//     description: "就活に活かせる実績づくり",
//     icon: Briefcase,
//   },
// ];

// const columns = [
//   {
//     id: 1,
//     title: "エンジニアのキャリアパス設計術",
//     excerpt: "技術力とビジネス視点のバランスが重要な理由とは？",
//   },
//   {
//     id: 2,
//     title: "効果的なポートフォリオの作り方",
//     excerpt: "採用担当者の心をつかむポートフォリオの3つの要素",
//   },
//   {
//     id: 3,
//     title: "ハッカソンに出るロードマップ",
//     excerpt: "ハッカソンに出るために必要なスキルやおすすめイベントについて",
//   },
//   {
//     id: 4,
//     title: "最新技術キャッチアップ戦略",
//     excerpt: "膨大な情報から本当に必要な技術を見極めるコツ",
//   },
// ];

// チャット機能実装のための一時的なエクスポート
export function Hero() {
  return (
    <div className="text-center">
      <p className="text-gray-600">Hero component - Chat UI 実装準備中</p>
    </div>
  );
}
