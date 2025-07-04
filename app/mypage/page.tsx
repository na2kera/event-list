import { getUserBookmarks } from "lib/api/client.ts/bookmarkApi";
import { getUserProfile } from "lib/api/server.ts/serverApi";
import { authOptions } from "lib/auth";
import { getServerSession } from "next-auth";
import { Header } from "components/layout/Header";
import { MyPageContent } from "components/mypage/MyPageContent";

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  let userId: string | null = null;

  try {
    userId = session.user.id;
    const userProfile = await getUserProfile(userId);
    const userbookmarks = await getUserBookmarks(userId);
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <MyPageContent userProfile={userProfile} userBookmarks={userbookmarks} />
      </div>
    );
  } catch (error) {
    console.error(`MyPage: Error fetching data for user ID ${userId}:`, error);
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">エラーが発生しました</h1>
          <p className="text-gray-600">データの取得に失敗しました。</p>
        </div>
      </div>
    );
  }
}
