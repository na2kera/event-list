import { BookmarkList } from "@/components/mypage/BookmarkList";
import { getUserBookmarks } from "@/lib/api/bookmarkApi";
import { getUserProfile } from "@/lib/api/serverApi";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function MyPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const userProfile = await getUserProfile(session.user.id);
  const userbookmarks = await getUserBookmarks(session.user.id);

  console.log(userProfile);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">マイページ</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">
            ブックマークしたイベント
          </h2>
          <BookmarkList bookmarks={userbookmarks} />
        </section>
      </div>
    </div>
  );
}
