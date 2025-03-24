import { getSpeakerList } from "@/lib/api/microcms";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60; // 60秒ごとに再検証

export default async function SpeakersPage() {
  try {
    const { contents: speakers } = await getSpeakerList();
    console.log("Server Component API Response:", speakers);

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">登壇者一覧</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <div className="relative w-full h-48">
                {speaker["speaker-image"] && speaker["speaker-image"].url ? (
                  <Image
                    src={speaker["speaker-image"].url}
                    alt={`登壇者ID: ${speaker["speaker-id"] || "Unknown"}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span>画像なし</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  登壇者ID: {speaker["speaker-id"] || "Unknown"}
                </h2>
                <Link
                  href={`/speakers/${speaker.id}`}
                  className="text-blue-600 hover:underline"
                >
                  詳細表示
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching speakers:", error);
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">登壇者一覧</h1>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p>
            登壇者情報の取得中にエラーが発生しました。後ほど再度お試しください。
          </p>
        </div>
      </div>
    );
  }
}
