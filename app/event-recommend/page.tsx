"use client";

import { useSession } from "next-auth/react";
import { useEventRecommend } from "@/hooks/useEventRecommend";
import { EventList } from "@/components/events/EventList";
import { Container } from "@/components/layout/Container";
import Link from "next/link";

export default function EventRecommendPage() {
  const { data: session } = useSession();
  const { events, isLoading, error, fetchRecommendedEvents } =
    useEventRecommend();

  // ログインチェック
  if (!session) {
    return (
      <Container>
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            おすすめイベント
          </h1>
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-8 rounded-lg max-w-md mx-auto">
            <svg
              className="w-12 h-12 mb-4 text-yellow-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              ></path>
            </svg>
            <p className="text-lg font-medium mb-4">ログインが必要です</p>
            <p className="text-sm mb-6">
              パーソナライズされたイベントのおすすめを受け取るには、ログインしてください。
            </p>
            <Link
              href="/auth/signin"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              ログイン
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          あなたにおすすめのイベント
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          あなたのプロフィールと興味に基づいて、最適なテックイベントをご提案します。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <button
            onClick={fetchRecommendedEvents}
            disabled={isLoading}
            className={`px-8 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg transform hover:-translate-y-0.5"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                レコメンド取得中...
              </div>
            ) : (
              "おすすめイベントを取得"
            )}
          </button>

          {!isLoading && events.length === 0 && (
            <p className="text-gray-500 self-center">
              ボタンをクリックして、おすすめイベントを取得してください
            </p>
          )}
        </div>
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="font-medium">エラー</span>
          </div>
          <p className="mt-1">{error}</p>
        </div>
      )}

      {/* ローディングインジケーター */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
            <p className="text-gray-600">
              あなたに最適なイベントを探しています...
            </p>
          </div>
        </div>
      )}

      {/* イベント一覧表示 */}
      {!isLoading && events.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              レコメンド結果
            </h2>
            <p className="text-gray-600">
              {events.length}件のおすすめイベントが見つかりました
            </p>
          </div>
          <EventList events={events} />
        </div>
      )}

      {/* イベントが見つからない場合 */}
      {!isLoading && !error && events.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-6 py-8 rounded-lg max-w-2xl mx-auto">
            <svg
              className="w-12 h-12 mb-4 text-blue-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="text-xl font-medium mb-2">
              条件に合うイベントが見つかりませんでした
            </h3>
            <p className="text-sm mb-6">
              現在開催予定のイベントがないか、プロフィール情報が不足している可能性があります。
              プロフィールを更新するか、しばらく経ってから再度お試しください。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/mypage/edit"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                プロフィールを編集
              </Link>
              <Link
                href="/events"
                className="inline-block border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
              >
                全イベントを見る
              </Link>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
