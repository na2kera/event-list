import Link from "next/link";
import { Sparkles, User, ArrowRight } from "lucide-react";
import { Container } from "components/layout/Container";
import { RecommendBenefitCard } from "./RecommendBenefitCard";
import { RECOMMEND_BENEFITS } from "constants/recommendConstants";

export function LoginPromptSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Container>
        <div className="text-center py-16">
          {/* ヒーローセクション */}
          <div className="mb-12">
            <Sparkles className="h-16 w-16 text-indigo-600 mx-auto mb-6" />
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              あなただけの
              <span className="text-indigo-600">おすすめイベント</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              AIがあなたのスキルと目標を分析し、成長につながる最適なテックイベントを提案します
            </p>
          </div>

          {/* ログイン促進カード */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-12 max-w-md mx-auto mb-12">
            <User className="h-12 w-12 text-indigo-600 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ログインして始めよう
            </h2>
            <p className="text-gray-600 mb-8">
              あなたのプロフィールに基づいたパーソナライズされたレコメンドを受け取りましょう
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              ログインする
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* レコメンドのメリット */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RECOMMEND_BENEFITS.map((benefit) => (
              <RecommendBenefitCard
                key={benefit.id}
                title={benefit.title}
                description={benefit.description}
                icon={benefit.icon}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
