"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const [showLineConsent, setShowLineConsent] = useState<boolean>(false);

  const handleSignIn = async (provider: string) => {
    if (provider === "line" && !showLineConsent) {
      setShowLineConsent(true);
      return;
    }

    try {
      const result = await signIn(provider, {
        redirect: true,
        callbackUrl: "/",
      });

      // redirect: true の場合、この部分は実行されません
      console.log("Sign in result:", result);
    } catch (error) {
      console.error("Sign in error:", error);
      setError("サインインに失敗しました。もう一度お試しください。");
    }
  };

  console.log(process.env.NEXT_PUBLIC_LINE_CHANNEL_ID);
  console.log(process.env.NEXT_PUBLIC_LINE_CHANNEL_SECRET);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            アカウントにサインイン
          </h2>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
        </div>

        {showLineConsent ? (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">
              メールアドレス取得について
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              LINEでサインインする際に、メールアドレスの取得を許可していただく必要があります。
              取得したメールアドレスは以下の目的でのみ使用します：
            </p>
            <ul className="text-sm text-gray-600 mb-6 list-disc pl-5 space-y-2">
              <li>アカウントの識別と管理</li>
              <li>重要な通知の送信</li>
              <li>サービス利用に関する連絡</li>
            </ul>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLineConsent(false)}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                onClick={() => handleSignIn("line")}
                className="flex-1 py-2 px-4 bg-[#06C755] text-white rounded-md text-sm font-medium hover:bg-[#05B34A]"
              >
                同意して続行
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-8 space-y-4">
            <button
              onClick={() => handleSignIn("github")}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              GitHubでサインイン
            </button>
            <button
              onClick={() => handleSignIn("line")}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#06C755] hover:bg-[#05B34A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#06C755]"
            >
              LINEでサインイン
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
