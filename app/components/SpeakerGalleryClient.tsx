"use client";

import { useEffect, useState } from "react";
import type { SpeakerContent } from "@/lib/api/microcms";
import Image from "next/image";
import Link from "next/link";

export default function SpeakerGalleryClient() {
  const [speakers, setSpeakers] = useState<SpeakerContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const response = await fetch("/api/speaker-images");
        if (!response.ok) {
          throw new Error("Failed to fetch speakers");
        }
        const data = await response.json();
        console.log("API Response:", data);
        // APIレスポンスの構造に応じて処理を変更
        if (data.contents) {
          setSpeakers(data.contents);
        } else if (Array.isArray(data)) {
          setSpeakers(data);
        } else {
          console.error("Unexpected API response structure:", data);
          setError("Unexpected API response structure");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
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
  );
}
