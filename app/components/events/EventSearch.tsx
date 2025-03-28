"use client";

import React, { useState, useEffect } from "react";
import { Search, Calendar, MapPin, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Event } from "@/types";
import { searchEvents, EventSearchParams } from "@/lib/api/backendApi";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface EventSearchProps {
  initialEvents: Event[];
}

export function EventSearch({ initialEvents }: EventSearchProps) {
  // 検索結果
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [totalCount, setTotalCount] = useState<number>(initialEvents.length);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 検索パラメータ
  const [searchParams, setSearchParams] = useState<EventSearchParams>({
    keyword: "",
    startDate: "",
    endDate: "",
    location: "",
    categories: [],
    skills: [],
  });

  // フィルター表示制御
  const [showFilters, setShowFilters] = useState<boolean>(false);

  // 検索実行
  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 空のパラメータを削除
      const cleanParams: EventSearchParams = Object.fromEntries(
        Object.entries(searchParams).filter(([, value]) => {
          if (Array.isArray(value)) return value.length > 0;
          return value !== "" && value !== undefined && value !== null;
        })
      ) as EventSearchParams;

      const result = await searchEvents(cleanParams);
      setEvents(result.data);
      setTotalCount(result.count);
    } catch (err) {
      console.error("検索エラー:", err);
      setError("イベントの検索中にエラーが発生しました。再度お試しください。");
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // パラメータ変更時の処理
  const handleParamChange = (
    key: keyof EventSearchParams,
    value: string | string[]
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // カテゴリ選択の処理
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSearchParams((prev) => {
      const currentCategories = Array.isArray(prev.categories)
        ? prev.categories
        : [];
      if (checked) {
        return { ...prev, categories: [...currentCategories, categoryId] };
      } else {
        return {
          ...prev,
          categories: currentCategories.filter((id) => id !== categoryId),
        };
      }
    });
  };

  // スキル選択の処理
  const handleSkillChange = (skillName: string, checked: boolean) => {
    setSearchParams((prev) => {
      const currentSkills = Array.isArray(prev.skills) ? prev.skills : [];
      if (checked) {
        return { ...prev, skills: [...currentSkills, skillName] };
      } else {
        return {
          ...prev,
          skills: currentSkills.filter((name) => name !== skillName),
        };
      }
    });
  };

  // フォームのサブミット処理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  // 日付と時間を組み合わせてフォーマットする関数
  const formatDateTime = (dateString: string | Date, time: string) => {
    if (!dateString || !time) return "";

    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    const [hours, minutes] = time.split(":");
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));

    return format(date, "yyyy年M月d日(E) HH:mm", { locale: ja });
  };

  // 初期表示時に検索を実行
  useEffect(() => {
    if (initialEvents.length === 0) {
      handleSearch();
    }
  }, [initialEvents.length, handleSearch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">イベントを検索</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors md:hidden"
        >
          <Filter className="h-5 w-5" />
          フィルター
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 検索フィルター */}
        <div
          className={`bg-white p-6 rounded-xl shadow-sm ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* キーワード検索 */}
              <div>
                <label
                  htmlFor="keyword"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  キーワード
                </label>
                <div className="relative">
                  <input
                    id="keyword"
                    type="text"
                    placeholder="タイトルや説明文で検索"
                    value={searchParams.keyword || ""}
                    onChange={(e) =>
                      handleParamChange("keyword", e.target.value)
                    }
                    className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* 日付範囲 */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  開催日
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      開始日
                    </label>
                    <input
                      id="startDate"
                      type="date"
                      value={searchParams.startDate || ""}
                      onChange={(e) =>
                        handleParamChange("startDate", e.target.value)
                      }
                      className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-xs text-gray-500 mb-1"
                    >
                      終了日
                    </label>
                    <input
                      id="endDate"
                      type="date"
                      value={searchParams.endDate || ""}
                      onChange={(e) =>
                        handleParamChange("endDate", e.target.value)
                      }
                      className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* 開催場所 */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-900 mb-2"
                >
                  開催場所
                </label>
                <input
                  id="location"
                  type="text"
                  placeholder="地域や会場名で検索"
                  value={searchParams.location || ""}
                  onChange={(e) =>
                    handleParamChange("location", e.target.value)
                  }
                  className="w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* カテゴリ */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  カテゴリ
                </h3>
                <div className="space-y-2">
                  {[
                    { id: "cat1", name: "ハッカソン" },
                    { id: "cat2", name: "ワークショップ" },
                    { id: "cat3", name: "セミナー" },
                    { id: "cat4", name: "コンテスト" },
                  ].map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(searchParams.categories) &&
                          searchParams.categories.includes(category.id)
                        }
                        onChange={(e) =>
                          handleCategoryChange(category.id, e.target.checked)
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* スキル */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  スキル
                </h3>
                <div className="space-y-2">
                  {[
                    { name: "JavaScript" },
                    { name: "React" },
                    { name: "TypeScript" },
                    { name: "Next.js" },
                    { name: "Node.js" },
                  ].map((skill) => (
                    <label key={skill.name} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          Array.isArray(searchParams.skills) &&
                          searchParams.skills.includes(skill.name)
                        }
                        onChange={(e) =>
                          handleSkillChange(skill.name, e.target.checked)
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-gray-700">{skill.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 検索ボタン */}
              <button
                type="submit"
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-sm transition-colors"
              >
                検索する
              </button>
            </div>
          </form>
        </div>

        {/* 検索結果 */}
        <div className="lg:col-span-3">
          {/* 検索結果ヘッダー */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              検索結果{" "}
              <span className="text-gray-500 text-lg">({totalCount}件)</span>
            </h2>
            {/* ソート機能などを追加可能 */}
          </div>

          {/* ローディング表示 */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          )}

          {/* エラー表示 */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md my-6">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* 検索結果なし */}
          {!isLoading && !error && events.length === 0 && (
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
          )}

          {/* イベント一覧 */}
          {!isLoading && !error && events.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
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
                    {event.categories && event.categories.length > 0 && (
                      <span className="absolute top-4 right-4 px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-700">
                        {event.categories[0].category.name}
                      </span>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {event.title}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {formatDateTime(event.eventDate, event.startTime)}
                          {event.endTime && <> 〜 {event.endTime}</>}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {event.venue || event.location || "オンライン"}
                        </span>
                      </div>
                    </div>

                    {/* スキルタグ */}
                    {event.skills && event.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {event.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill.id}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {skill.name}
                          </span>
                        ))}
                        {event.skills.length > 3 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{event.skills.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        主催: {event.organizationId || "不明"}
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
