"use client";

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            エラーが発生しました
          </h2>
          <p className="mt-2 text-center text-sm text-red-600">
            {error || "認証中にエラーが発生しました。もう一度お試しください。"}
          </p>
          <div className="mt-4 text-center">
            <a
              href="/auth/signin"
              className="text-indigo-600 hover:text-indigo-500"
            >
              サインインページに戻る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
