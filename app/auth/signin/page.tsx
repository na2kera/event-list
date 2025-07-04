"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [error, setError] = useState<string | null>(null);
  const [showLineConsent, setShowLineConsent] = useState<boolean>(false);
  const [showTestLogin, setShowTestLogin] = useState<boolean>(false);
  const [testCredentials, setTestCredentials] = useState({
    email: "",
    password: "",
  });

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

  const handleTestLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!testCredentials.email || !testCredentials.password) {
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }

    try {
      const result = await signIn("credentials", {
        email: testCredentials.email,
        password: testCredentials.password,
        redirect: true,
        callbackUrl: "/",
      });

      console.log("Test login result:", result);
    } catch (error) {
      console.error("Test login error:", error);
      setError("テストユーザーログインに失敗しました。");
    }
  };

  const handleQuickTestLogin = (userType: "test" | "admin" | "developer") => {
    const emailMap = {
      test: "test@example.com",
      admin: "admin@example.com",
      developer: "developer@example.com",
    };

    setTestCredentials({
      email: emailMap[userType],
      password: "testpassword123",
    });
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

            {/* テストユーザーログイン */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">または</span>
              </div>
            </div>

            <button
              onClick={() => setShowTestLogin(!showTestLogin)}
              className="group relative w-full flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              テストユーザーでログイン
            </button>

            {showTestLogin && (
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="text-lg font-semibold mb-4">
                  テストユーザーログイン
                </h3>

                {/* クイックログインボタン */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">
                    クイックログイン:
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleQuickTestLogin("test")}
                      className="py-2 px-3 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                    >
                      Test User
                    </button>
                    <button
                      onClick={() => handleQuickTestLogin("admin")}
                      className="py-2 px-3 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200"
                    >
                      Admin User
                    </button>
                    <button
                      onClick={() => handleQuickTestLogin("developer")}
                      className="py-2 px-3 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200"
                    >
                      Developer User
                    </button>
                  </div>
                </div>

                {/* ログインフォーム */}
                <form onSubmit={handleTestLogin} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      メールアドレス
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={testCredentials.email}
                      onChange={(e) =>
                        setTestCredentials((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="test@example.com"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      パスワード
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={testCredentials.password}
                      onChange={(e) =>
                        setTestCredentials((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="testpassword123"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    ログイン
                  </button>
                </form>

                <div className="mt-4 text-xs text-gray-500">
                  <p>
                    <strong>テストユーザー情報:</strong>
                  </p>
                  <p>• test@example.com (一般ユーザー)</p>
                  <p>• admin@example.com (管理者)</p>
                  <p>• developer@example.com (開発者)</p>
                  <p>共通パスワード: testpassword123</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
