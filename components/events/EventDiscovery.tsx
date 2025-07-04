"use client";

import React, { useState } from "react";
import { Search, Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Event, EventFormat } from "@/types";
import { BookmarkButton } from "./BookmarkButton";
import { prefectureOptions } from "../../constants/prefectures";

type EventType = "all" | "hackathon" | "workshop" | "contest";
type DifficultyLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "FOR_EVERYONE";
type Format = "all" | EventFormat;

interface EventDiscoveryProps {
  events: (Event & {
    organization?: { name: string };
    speakers?: {
      speaker: {
        id: string;
        name: string;
        occupation: string;
        affiliation: string;
        bio: string;
      };
    }[];
    skills?: { id: string; name: string }[];
    categories?: {
      category: { id: string; name: string };
    }[];
    isBookmarked: boolean;
  })[];
  initialType?: string;
}

export function EventDiscovery({
  events,
  initialType = "all",
}: EventDiscoveryProps) {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<EventType>(
    initialType as EventType
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    DifficultyLevel | "all"
  >("all");
  const [priceRange, setPriceRange] = useState<number>(10000);
  const [showOnlyFree, setShowOnlyFree] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [keyPhraseQuery, setKeyPhraseQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const getEventType = (event: Event): Exclude<EventType, "all"> => {
    // バックエンドから返されるeventTypeフィールドがある場合はそれを優先
    if (event.eventType) {
      // バックエンドのeventTypeはENUMなので大文字（HACKATHON, WORKSHOP, CONTEST）
      // フロントエンドのEventTypeは小文字（hackathon, workshop, contest）
      const typeMapping: Record<string, Exclude<EventType, "all">> = {
        HACKATHON: "hackathon",
        WORKSHOP: "workshop",
        CONTEST: "contest",
        LIGHTNING_TALK: "workshop", // LT会はワークショップとして扱う
      };

      return typeMapping[event.eventType] || "workshop";
    }

    // eventTypeがない場合はカテゴリーからイベントタイプを推測（後方互換性のため）
    const categoryNames =
      event.categories?.map((c) => c.category.name.toLowerCase()) || [];

    if (categoryNames.some((name) => name.includes("hackathon")))
      return "hackathon";
    if (categoryNames.some((name) => name.includes("workshop")))
      return "workshop";
    if (categoryNames.some((name) => name.includes("contest")))
      return "contest";

    // デフォルト値
    return "workshop";
  };

  const getEventFormat = (event: Event): Exclude<Format, "all"> => {
    return event.format || "OFFLINE";
  };

  const getEventDifficulty = (event: Event): DifficultyLevel => {
    return event.difficulty;
  };

  const filteredEvents = events.filter((event) => {
    const eventType = getEventType(event);
    const eventDifficulty = getEventDifficulty(event);
    const eventPrice = event.price || 0;

    if (selectedType !== "all" && eventType !== selectedType) return false;
    if (selectedDifficulty !== "all" && eventDifficulty !== selectedDifficulty)
      return false;
    if (showOnlyFree && eventPrice > 0) return false;
    if (eventPrice > priceRange) return false;
    if (
      searchQuery &&
      !event.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false;
    if (
      keyPhraseQuery &&
      !(
        event.keyPhrases &&
        event.keyPhrases.some((phrase) =>
          phrase.toLowerCase().includes(keyPhraseQuery.toLowerCase())
        )
      )
    ) {
      return false;
    }
    if (selectedLocation && event.location !== selectedLocation) return false;
    return true;
  });

  // 日付と時間を組み合わせてフォーマットする関数
  const formatDateTime = (date: Date, time: string) => {
    if (!date || !time) return "";

    const [hours, minutes] = time.split(":");
    const dateTime = new Date(date);
    dateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateTime);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">イベントを探す</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="イベントを検索"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6">フィルター</h2>

          <div className="space-y-6">
            {/* Event Type */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                イベントタイプ
              </h3>
              <div className="space-y-2">
                {[
                  { value: "all", label: "すべて" },
                  { value: "hackathon", label: "ハッカソン" },
                  { value: "workshop", label: "ワークショップ" },
                  { value: "contest", label: "コンテスト" },
                ].map((type) => (
                  <label key={type.value} className="flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      checked={selectedType === type.value}
                      onChange={() => {
                        // イベントタイプが変更されたらページ遷移する
                        const newType = type.value as EventType;
                        setSelectedType(newType);
                        // サーバーコンポーネントでデータを再取得するためにページ遷移
                        if (newType === "all") {
                          router.push("/events");
                        } else {
                          router.push(`/events?type=${newType}`);
                        }
                      }}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-gray-700">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 開催地（都道府県＋オンライン） */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">開催地</h3>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              >
                {prefectureOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Level */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">難易度</h3>
              <select
                value={selectedDifficulty}
                onChange={(e) =>
                  setSelectedDifficulty(
                    e.target.value as DifficultyLevel | "all"
                  )
                }
                className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">すべてのレベル</option>
                <option value="BEGINNER">初心者向け</option>
                <option value="INTERMEDIATE">中級者向け</option>
                <option value="ADVANCED">上級者向け</option>
                <option value="FOR_EVERYONE">全ての方向け</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                価格帯 (¥)
              </h3>
              <input
                type="range"
                min="0"
                max="10000"
                step="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>¥0</span>
                <span>¥{priceRange.toLocaleString()}</span>
              </div>
            </div>

            {/* Free Events Toggle */}
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={showOnlyFree}
                onChange={(e) => setShowOnlyFree(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">
                無料イベントのみ表示
              </label>
            </div>

            {/* キーフレーズ検索 */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                キーフレーズ検索
              </h3>
              <input
                type="text"
                placeholder="キーフレーズで検索"
                value={keyPhraseQuery}
                onChange={(e) => setKeyPhraseQuery(e.target.value)}
                className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 py-3 px-4 text-base"
              />
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="lg:col-span-3">
          {filteredEvents.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-8 rounded-md flex flex-col items-center justify-center my-6">
              <svg
                className="w-12 h-12 mb-4 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <p className="text-center text-lg font-medium">
                条件に一致するイベントが見つかりませんでした
              </p>
              <p className="text-center text-sm mt-2">
                検索条件を変更してお試しください
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <div className="w-full h-48 relative">
                      <Image
                        src={
                          event.image ||
                          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
                        }
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    {/* イベントタイプ表示 */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700 z-10">
                      {getEventType(event) === "hackathon"
                        ? "ハッカソン"
                        : getEventType(event) === "workshop"
                        ? "ワークショップ"
                        : "コンテスト"}
                    </span>
                    {/* BookmarkButton を追加 */}
                    <div className="absolute top-4 right-4 z-10">
                      <BookmarkButton
                        eventId={event.id}
                        isBookmarked={event.isBookmarked}
                      />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>

                    {/* キーフレーズ表示 */}
                    {event.keyPhrases && event.keyPhrases.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {event.keyPhrases.map((phrase, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                          >
                            {phrase}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {formatDateTime(
                            new Date(event.eventDate),
                            event.startTime
                          )}
                          {event.endTime && (
                            <>
                              {" "}
                              〜{" "}
                              {formatDateTime(
                                new Date(event.eventDate),
                                event.endTime
                              )}
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {event.location || "オンライン"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {getEventDifficulty(event) === "BEGINNER"
                            ? "初心者向け"
                            : getEventDifficulty(event) === "INTERMEDIATE"
                            ? "中級者向け"
                            : getEventDifficulty(event) === "ADVANCED"
                            ? "上級者向け"
                            : "全ての方向け"}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {getEventFormat(event) === "ONLINE"
                            ? "オンライン"
                            : "オフライン"}
                        </span>
                      </div>
                      <Link
                        href={`/events/${event.id}`}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-sm"
                      >
                        詳細を見る →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
