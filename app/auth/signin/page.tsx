"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    try {
      const result = await signIn("github", {
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
        <div className="mt-8 space-y-6">
          <button
            onClick={handleSignIn}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            GitHubでサインイン
          </button>
        </div>
      </div>
    </div>
  );
}
