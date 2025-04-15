import { BookmarkList } from "@/components/mypage/BookmarkList";

export default function MyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">マイページ</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">
            ブックマークしたイベント
          </h2>
          <BookmarkList />
        </section>
      </div>
    </div>
  );
}
