"use client";

import { useState } from "react";

interface LineLoginButtonProps {
  className?: string;
}

export default function LineLoginButton({
  className = "",
}: LineLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLineLogin = () => {
    setIsLoading(true);

    // LINE認証URLの生成
    const lineClientId = process.env.NEXT_PUBLIC_LINE_CLIENT_ID;
    // リダイレクトURIはLINE Developersコンソールに登録されているものと一致させる
    const redirectUri = encodeURIComponent(
      process.env.NEXT_PUBLIC_LINE_REDIRECT_URI ||
        "http://localhost:3000/line-connect" // ここをLINE Developersコンソールの設定に合わせて修正
    );

    // 認証時に必要なstate（CSRF対策）
    const state = Math.random().toString(36).substring(2, 15);

    // stateをローカルストレージに保存
    localStorage.setItem("lineAuthState", state);

    // LINE認証URLを構築
    const authUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${lineClientId}&redirect_uri=${redirectUri}&state=${state}&scope=profile%20openid%20email&bot_prompt=aggressive`;

    // LINE認証ページにリダイレクト
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleLineLogin}
      disabled={isLoading}
      className={`flex items-center justify-center bg-[#06C755] text-white py-2 px-4 rounded-md hover:bg-[#05b14c] transition-colors ${className}`}
    >
      {isLoading ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
          処理中...
        </span>
      ) : (
        <span className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 448 512"
            fill="currentColor"
            className="mr-2"
          >
            <path d="M272.1 204.2v71.1c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.1 0-2.1-.6-2.6-1.3l-32.6-44v42.2c0 1.8-1.4 3.2-3.2 3.2h-11.4c-1.8 0-3.2-1.4-3.2-3.2v-71.1c0-1.8 1.4-3.2 3.2-3.2H219c1.1 0 2.1.6 2.6 1.3l32.6 44v-42.2c0-1.8 1.4-3.2 3.2-3.2h11.4c1.8-.1 3.3 1.4 3.3 3.1zm-82-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 1.8 1.4 3.2 3.2 3.2h11.4c1.8 0 3.2-1.4 3.2-3.2v-71.1c0-1.7-1.4-3.2-3.2-3.2zm-27.5 59.6h-31.1v-56.4c0-1.8-1.4-3.2-3.2-3.2h-11.4c-1.8 0-3.2 1.4-3.2 3.2v71.1c0 .9.3 1.6.9 2.2.6.5 1.3.9 2.2.9h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.7-1.4-3.2-3.1-3.2zM332.1 201h-45.7c-1.7 0-3.2 1.4-3.2 3.2v71.1c0 1.7 1.4 3.2 3.2 3.2h45.7c1.8 0 3.2-1.4 3.2-3.2v-11.4c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2V234c0-1.8-1.4-3.2-3.2-3.2H301v-12h31.1c1.8 0 3.2-1.4 3.2-3.2v-11.4c-.1-1.7-1.5-3.2-3.2-3.2zM448 113.7V399c-.1 44.8-36.8 81.1-81.7 81H81c-44.8-.1-81.1-36.9-81-81.7V113c.1-44.8 36.9-81.1 81.7-81H367c44.8.1 81.1 36.8 81 81.7zm-61.6 122.6c0-73-73.2-132.4-163.1-132.4-89.9 0-163.1 59.4-163.1 132.4 0 65.4 58 120.2 136.4 130.6 19.1 4.1 16.9 11.1 12.6 36.8-.7 4.1-3.3 16.1 14.1 8.8 17.4-7.3 93.9-55.3 128.2-94.7 23.6-26 34.9-52.3 34.9-81.5z" />
          </svg>
          LINEでログイン
        </span>
      )}
    </button>
  );
}
