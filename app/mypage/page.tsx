import { BookmarkList } from "@/components/mypage/BookmarkList";
import { getUserBookmarks } from "@/lib/api/bookmarkApi";
import { getUserProfile } from "@/lib/api/serverApi";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { GOAL_LABELS } from "@/types/enums";

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userProfile = await getUserProfile(session.user.id);
  const userbookmarks = await getUserBookmarks(session.user.id);

  console.log(userProfile);
  console.log(userbookmarks);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">マイページ</h1>

      {/* プロフィールセクション */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">プロフィール</h2>
          <Link href="/mypage/edit">
            <Button variant="outlined" startIcon={<EditIcon />} size="small">
              編集
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center space-x-4 mb-4">
            {userProfile.image && (
              <img
                src={userProfile.image}
                alt={userProfile.name || "プロフィール画像"}
                className="w-16 h-16 rounded-full"
              />
            )}
            <div>
              <h3 className="text-lg font-semibold">
                {userProfile.name || "未設定"}
              </h3>
              {userProfile.email && (
                <p className="text-gray-600">{userProfile.email}</p>
              )}
            </div>
          </div>

          {/* 技術情報 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">技術スタック</h4>
              <div className="flex flex-wrap gap-2">
                {userProfile.stack?.length > 0 ? (
                  userProfile.stack.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">未設定</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">レベル</h4>
              <p className="text-gray-700">{userProfile.level || "未設定"}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">場所</h4>
              <p className="text-gray-700">{userProfile.place || "未設定"}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">所属</h4>
              <p className="text-gray-700">
                {userProfile.affiliation || "未設定"}
              </p>
            </div>
          </div>

          {/* 目標とタグ */}
          <div className="mt-4">
            <h4 className="font-medium mb-2">目標</h4>
            <div className="flex flex-wrap gap-2">
              {userProfile.goal?.length > 0 ? (
                userProfile.goal.map((goal: string, index: number) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {GOAL_LABELS[goal as keyof typeof GOAL_LABELS] || goal}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">未設定</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="font-medium mb-2">興味タグ</h4>
            <div className="flex flex-wrap gap-2">
              {userProfile.tag?.length > 0 ? (
                userProfile.tag.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">未設定</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ブックマークセクション */}
      <section>
        <h2 className="text-xl font-semibold mb-4">ブックマークしたイベント</h2>
        <BookmarkList bookmarks={userbookmarks} />
      </section>
    </div>
  );
}
