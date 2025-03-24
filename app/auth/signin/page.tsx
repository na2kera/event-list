"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);

  const handleGithubSignIn = async () => {
    try {
      await signIn("github", {
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setError("サインインに失敗しました。もう一度お試しください。");
    }
  };

  const handleTestUserSignIn = async () => {
    try {
      await signIn("credentials", {
        email: "test@gmail.com",
        password: "test1234",
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Test user sign in error:", error);
      setError(
        "テストユーザーでのサインインに失敗しました。もう一度お試しください。"
      );
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
        <div className="mt-8 space-y-4">
          <button
            onClick={handleGithubSignIn}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            GitHubでサインイン
          </button>
          <button
            onClick={handleTestUserSignIn}
            className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            テストユーザーでサインイン
          </button>
        </div>
      </div>
    </div>
  );
}
