import { getSpeakerDetail, getSpeakerList } from "@/app/lib/api/microcms";
import Image from "next/image";
import Link from "next/link";

export const revalidate = 60; // 60秒ごとに再検証

// 静的生成のためのパスを生成
export async function generateStaticParams() {
  const { contents } = await getSpeakerList({ fields: ["id"] });

  return contents.map((speaker) => ({
    id: speaker.id,
  }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SpeakerDetailPage({ params }: Props) {
  const { id } = await params;
  const speaker = await getSpeakerDetail(id);

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative w-full h-96">
          {speaker["speaker-image"] && speaker["speaker-image"].url ? (
            <Image
              src={speaker["speaker-image"].url}
              alt={`登壇者ID: ${speaker["speaker-id"] || "Unknown"}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span>画像なし</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">
            登壇者ID: {speaker["speaker-id"] || "Unknown"}
          </h1>
          <div className="mt-8">
            <Link href="/speakers" className="text-blue-600 hover:underline">
              ← 登壇者一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
