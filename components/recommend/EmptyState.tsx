import Link from "next/link";
import { AlertCircle, User, TrendingUp } from "lucide-react";

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-2xl mx-auto border border-gray-100">
        <AlertCircle className="h-16 w-16 text-blue-500 mx-auto mb-6" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          条件に合うイベントが見つかりませんでした
        </h3>
        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
          現在開催予定のイベントがないか、プロフィール情報が不足している可能性があります。
          <br />
          プロフィールを更新するか、しばらく経ってから再度お試しください。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/mypage/edit"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            <User className="h-5 w-5" />
            プロフィールを編集
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center gap-2 border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors"
          >
            <TrendingUp className="h-5 w-5" />
            全イベントを見る
          </Link>
        </div>
      </div>
    </div>
  );
}
