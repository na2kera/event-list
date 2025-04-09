"use client";

import { useEffect, useState } from "react";
import { Event, Speaker, Category } from "@/types";
import { fetchEventById } from "@/lib/api/backendApi";
import { ArrowRight, Calendar, Clock, MapPin, Target } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface EventDetailProps {
  eventId: string;
  initialEventData?: Event & {
    organization: { name: string };
    speakers: {
      speaker: Speaker;
    }[];
    skills: { name: string }[];
    categories: {
      category: Category;
    }[];
  };
}

export function EventDetail({ eventId, initialEventData }: EventDetailProps) {
  type EventWithRelations = Event & {
    organization: { name: string };
    speakers: {
      speaker: Speaker;
    }[];
    skills: { name: string }[];
    categories: {
      category: Category;
    }[];
  };

  const [event, setEvent] = useState<EventWithRelations | undefined>(
    initialEventData
  );
  const [isLoading, setIsLoading] = useState(!initialEventData);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 初期データがあればフェッチをスキップ
    if (initialEventData) {
      return;
    }

    const fetchEvent = async () => {
      try {
        // 初期データがない場合のみバックエンドAPIから取得
        const data = await fetchEventById(eventId);
        setEvent(data);
      } catch (error) {
        setError("イベントの取得に失敗しました");
        console.error("Error fetching event:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, initialEventData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !event) {
    return (
      <div className="text-red-500">{error || "イベントが見つかりません"}</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* ヒーローセクション */}
        <div className="relative h-96">
          <Image
            src={
              event.image ||
              "https://images.unsplash.com/photo-1551650975-87deedd944c3"
            }
            alt="イベントのヘッダー画像"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(event.eventDate).toLocaleDateString("ja-JP")}
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                {event.startTime}
                {event.endTime ? ` - ${event.endTime}` : ""}
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <div className="flex flex-col">
                  <span>{event.venue}</span>
                  {event.address && (
                    <span className="text-sm">{event.address}</span>
                  )}
                  {event.location && (
                    <span className="text-sm text-gray-300">
                      ({event.location})
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* イベント概要 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                イベント概要
              </h2>
              <p className="text-gray-600 mb-6">{event.description}</p>

              {/* イベントカテゴリ */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  イベントカテゴリ
                </h2>
                <div className="flex flex-wrap gap-3">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      event.difficulty === "BEGINNER"
                        ? "bg-green-50 text-green-700"
                        : event.difficulty === "INTERMEDIATE"
                        ? "bg-yellow-50 text-yellow-700"
                        : event.difficulty === "ADVANCED"
                        ? "bg-red-50 text-red-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {event.difficulty === "BEGINNER"
                      ? "初心者向け"
                      : event.difficulty === "INTERMEDIATE"
                      ? "中級者向け"
                      : event.difficulty === "ADVANCED"
                      ? "上級者向け"
                      : "全ての方向け"}
                  </span>
                  {event.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium"
                    >
                      {category.category.name}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">
                学べること
              </h3>
              <ul className="space-y-3">
                {event.skills.map((skill, index) => (
                  <li key={index} className="flex items-start">
                    <Target className="h-5 w-5 text-indigo-600 mr-3 mt-1" />
                    <span className="text-gray-600">{skill.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="space-y-6">
                  {/* <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>参加者数</span>
                      <span className="font-medium">
                        {event.participants}/{event.spots}人
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{
                          width: `${(event.participants / event.spots) * 100}%`,
                        }}
                      />
                    </div>
                  </div> */}

                  {/* <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <Trophy className="h-5 w-5 text-indigo-600 mr-2" />
                      <span className="text-gray-600">成長達成率</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {event.success_rate}
                    </span>
                  </div> */}
                  {/* 
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-indigo-600 mr-2" />
                      <span className="text-gray-600">ポートフォリオ化率</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {event.portfolio_rate}
                    </span>
                  </div> */}

                  {event.detailUrl ? (
                    <Link href={event.detailUrl}>
                      <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center">
                        このイベントに参加する
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </button>
                    </Link>
                  ) : (
                    <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center">
                      このイベントに参加する
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 成果物セクション */}
          {/* <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              イベント参加で得られる成果物
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {event.outcomes.map((outcome, index) => {
                const Icon = outcome.icon;
                return (
                  <div key={index} className="bg-gray-50 rounded-xl p-6">
                    <Icon className="h-8 w-8 text-indigo-600 mb-4" />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {outcome.title}
                    </h3>
                    <p className="text-gray-600">{outcome.description}</p>
                  </div>
                );
              })}
            </div>
          </div> */}

          {/* 講師プロフィール */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              講師プロフィール
            </h2>
            <div className="flex items-center space-x-4">
              {event.speakers.map((speaker, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Image
                    src={
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                    }
                    alt={`${speaker.speaker.name}のプロフィール画像`}
                    width={64}
                    height={64}
                    className="rounded-full object-cover aspect-square"
                    style={{
                      minWidth: "64px",
                      minHeight: "64px",
                    }}
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {speaker.speaker.name}
                    </h3>
                    <p className="text-gray-600">
                      {speaker.speaker.occupation}
                    </p>
                    <p className="text-gray-600">
                      {speaker.speaker.affiliation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 関連イベント */}
          {/* <RelatedEvents currentEventId={event.id} category={event.category} /> */}
        </div>
      </div>
    </div>
  );
}
