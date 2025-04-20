"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// バックエンドAPIのベースURL
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

function LineCallbackContent() {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState<string>("");
  const [lineProfile, setLineProfile] = useState<{
    userId: string;
    displayName: string;
    pictureUrl?: string;
  } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleLineCallback = async () => {
      try {
        // URLパラメータからコードとステートを取得
        const code = searchParams?.get("code");
        const state = searchParams?.get("state");
        const error = searchParams?.get("error");
        const errorDescription = searchParams?.get("error_description");

        // エラーチェック
        if (error) {
          throw new Error(`LINE認証エラー: ${error} - ${errorDescription}`);
        }

        if (!code) {
          throw new Error("認証コードがありません");
        }

        // ローカルストレージからステートを取得（CSRF対策）
        const savedState = localStorage.getItem("lineAuthState");
        if (state !== savedState) {
          throw new Error("不正なステートパラメータです");
        }

        // LINE認証処理（トークン取得、プロフィール取得、ユーザー情報保存）を一括で行う
        const authResponse = await fetch(`${API_BASE_URL}/line/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        });

        if (!authResponse.ok) {
          const errorData = await authResponse.json();
          throw new Error(errorData.message || "LINE認証に失敗しました");
        }

        const authData = await authResponse.json();
        console.log("LINE認証結果:", authData);
        
        // プロフィール情報を設定
        if (authData.profile) {
          setLineProfile({
            userId: authData.profile.userId,
            displayName: authData.profile.displayName,
            pictureUrl: authData.profile.pictureUrl,
          });
        } else if (authData.user) {
          // プロフィール情報がない場合はユーザー情報から設定
          setLineProfile({
            userId: authData.user.lineId,
            displayName: authData.user.name,
            pictureUrl: authData.user.image,
          });
        }

        // セッション情報をローカルストレージに保存
        if (authData.user && authData.user.id) {
          localStorage.setItem("userId", authData.user.id);
          localStorage.setItem("lineId", authData.user.lineId || "");
          
          // トークン情報があれば保存
          if (authData.token && authData.token.access_token) {
            localStorage.setItem("lineAccessToken", authData.token.access_token);
          }
        }

        // 成功メッセージを設定
        setStatus("success");
        setMessage("LINEアカウントと連携しました！");

        // ローカルストレージからステートを削除
        localStorage.removeItem("lineAuthState");
      } catch (error) {
        console.error("LINE連携エラー:", error);
        setStatus("error");
        setMessage(
          error instanceof Error ? error.message : "LINE連携に失敗しました"
        );
      }
    };

    handleLineCallback();
  }, [searchParams, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">LINEアカウント連携</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {status === "loading" && (
          <div className="flex flex-col items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
            <p>LINE連携処理中...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center py-4">
            <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6 w-full">
              {message}
            </div>

            {lineProfile && (
              <div className="flex flex-col items-center mb-6">
                {lineProfile.pictureUrl && (
                  <img
                    src={lineProfile.pictureUrl}
                    alt={lineProfile.displayName}
                    className="w-20 h-20 rounded-full mb-2"
                  />
                )}
                <h2 className="text-xl font-semibold">
                  {lineProfile.displayName}
                </h2>
                <p className="text-gray-600 text-sm">
                  LINE ID: {lineProfile.userId}
                </p>
              </div>
            )}

            <div className="flex flex-col items-center">
              <p className="mb-4">友だち追加が完了しました！</p>
              <Link
                href="/"
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
              >
                ホームに戻る
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center py-4">
            <div className="bg-red-100 text-red-800 p-4 rounded-md mb-6 w-full">
              {message}
            </div>

            <div className="flex flex-col items-center">
              <p className="mb-4">もう一度お試しください</p>
              <div className="flex space-x-4">
                <button
                  onClick={() => router.push("/")}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
                >
                  ホームに戻る
                </button>
                <button
                  onClick={() => (window.location.href = "/")}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  再試行
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// メインのページコンポーネント - Suspenseでラップする
export default function LineCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LineCallbackContent />
    </Suspense>
  );
}
