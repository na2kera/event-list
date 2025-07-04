"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { GOAL_LABELS, DIFFICULTY_LABELS } from "types/enums";
import { Bookmark } from "@/types";
import { BookmarkList } from "./BookmarkList";

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  stack: string[];
  level: string | null;
  place: string | null;
  tag: string[];
  goal: string[];
  affiliation: string | null;
}

interface MyPageContentProps {
  userProfile: UserProfile;
  userBookmarks: Bookmark[];
}

export function MyPageContent({
  userProfile,
  userBookmarks,
}: MyPageContentProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">マイページ</h1>

      {/* プロフィールセクション */}
      <section className="mb-8">
        <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-lg p-6 mb-6 flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-4">
            {userProfile?.image && (
              <Image
                src={userProfile.image}
                alt={userProfile.name ?? "プロフィール画像"}
                width={80}
                height={80}
                className="rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold">{userProfile?.name ?? "未設定"}</h2>
              {userProfile?.affiliation && (
                <p className="text-gray-600">{userProfile.affiliation}</p>
              )}
            </div>
          </div>
          <Link href="/mypage/edit" className="mt-4 md:mt-0">
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none">
              <Pencil size={16} />
              プロフィール編集
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          

          {/* 技術情報 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2">技術スタック</h4>
              <div className="flex flex-wrap gap-2">
                {userProfile.stack?.length > 0 ? (
                  userProfile.stack.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 shadow-sm"
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
              <p className="text-gray-700">
                {userProfile?.level
                  ? DIFFICULTY_LABELS[
                      userProfile.level as keyof typeof DIFFICULTY_LABELS
                    ]
                  : "未設定"}
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">場所</h4>
              <p className="text-gray-700">{userProfile?.place ?? "未設定"}</p>
            </div>

            <div>
              <h4 className="font-medium mb-2">所属</h4>
              <p className="text-gray-700">
                {userProfile?.affiliation ?? "未設定"}
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
                    className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 shadow-sm"
                  >
                    {GOAL_LABELS[goal as keyof typeof GOAL_LABELS] ?? goal}
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
                    className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 shadow-sm"
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
        <BookmarkList bookmarks={userBookmarks} />
      </section>
    </div>
  );
}
