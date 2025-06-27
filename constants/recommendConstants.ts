import { Target, TrendingUp, Users } from "lucide-react";

export const RECOMMEND_BENEFITS = [
  {
    id: "personalized",
    title: "パーソナライズされた提案",
    description: "あなたのスキルと興味に最適化されたイベントを厳選",
    icon: Target,
  },
  {
    id: "growth",
    title: "スキル成長の加速",
    description: "現在のレベルから次のステップへ導くイベントを発見",
    icon: TrendingUp,
  },
  {
    id: "networking",
    title: "価値のあるつながり",
    description: "同じ志を持つエンジニアとの出会いの機会を提供",
    icon: Users,
  },
] as const;
