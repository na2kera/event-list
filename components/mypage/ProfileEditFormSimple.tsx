"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Layers,
  Target as TargetIcon,
  Tag as TagIcon,
  Building2,
  Code,
  Search,
  X,
} from "lucide-react";
import {
  DifficultyLevel,
  GoalType,
  DIFFICULTY_LABELS,
  GOAL_LABELS,
} from "types/enums";
import { updateUserProfile, UserProfile } from "lib/api/client.ts/userApi";
import { predefinedTags } from "../../lib/data/tags";

interface ProfileEditFormSimpleProps {
  initialData: UserProfile;
}

const profileSchema = z.object({
  name: z
    .string()
    .min(1, "名前は必須です")
    .max(50, "名前は50文字以内で入力してください"),
  email: z
    .string()
    .email("有効なメールアドレスを入力してください")
    .optional()
    .or(z.literal("")),
  level: z.nativeEnum(DifficultyLevel).optional(),
  place: z.string().optional(),
  affiliation: z.string().optional(),
  stack: z.array(z.string()).optional(),
  tag: z.array(z.string()).optional(),
  goal: z.array(z.nativeEnum(GoalType)).optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileEditFormSimple({
  initialData,
}: ProfileEditFormSimpleProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData.name || "",
      email: initialData.email || "",
      level: (initialData.level as DifficultyLevel) ?? DifficultyLevel.BEGINNER,
      place: initialData.place || "",
      affiliation: initialData.affiliation || "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stacks, setStacks] = useState<string[]>(initialData.stack || []);
  const [newStack, setNewStack] = useState("");
  const [tags, setTags] = useState<string[]>(initialData.tag || []);
  const [selectedGoals, setSelectedGoals] = useState<GoalType[]>(
    (initialData.goal || []) as GoalType[]
  );

  // タグ選択用の状態
  const [searchTerm, setSearchTerm] = useState("");

  const addStack = () => {
    if (newStack.trim() && !stacks.includes(newStack.trim())) {
      setStacks([...stacks, newStack.trim()]);
      setNewStack("");
    }
  };
  const removeStack = (s: string) => {
    setStacks(stacks.filter((i) => i !== s));
  };

  const toggleTag = (tagTitle: string) => {
    setTags((prev) =>
      prev.includes(tagTitle)
        ? prev.filter((t) => t !== tagTitle)
        : [...prev, tagTitle]
    );
  };

  const removeTag = (t: string) => {
    setTags(tags.filter((i) => i !== t));
  };

  const toggleGoal = (g: GoalType) => {
    setSelectedGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    );
  };

  // 検索結果のフィルタリング（全100個のタグから）
  const getFilteredTags = () => {
    if (!searchTerm) {
      return predefinedTags;
    }
    return predefinedTags.filter((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    setIsSubmitting(true);
    try {
      await updateUserProfile(initialData.id, {
        ...data,
        stack: stacks,
        tag: tags,
        goal: selectedGoals,
      });
      router.push("/mypage");
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl bg-white rounded-3xl shadow p-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        プロフィール編集
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {/* 名前 / メール */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              名前
            </label>
            <input
              type="text"
              className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              {...register("name")}
              disabled={isSubmitting}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス
            </label>
            <input
              type="email"
              className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* 技術スタック */}
        <div>
          <h3 className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
            <Layers className="w-4 h-4 text-indigo-600" /> 技術スタック
          </h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={newStack}
              onChange={(e) => setNewStack(e.target.value)}
              className="flex-grow rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="新しいスキル"
              disabled={isSubmitting}
            />
            <button
              type="button"
              onClick={addStack}
              className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
              disabled={isSubmitting}
            >
              追加
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {stacks.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-indigo-200 bg-indigo-50 text-xs text-indigo-700"
              >
                <Code className="w-3 h-3" />
                {s}
                <button
                  type="button"
                  onClick={() => removeStack(s)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* 興味タグ - 改善されたUI */}
        <div>
          <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-4">
            <TagIcon className="w-4 h-4 text-purple-600" />
            興味タグ
            {tags.length > 0 && (
              <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                {tags.length}個選択中
              </span>
            )}
          </h3>

          {/* 検索バー */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="タグを検索..."
              disabled={isSubmitting}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* タグ一覧（全100個表示） */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-64 overflow-y-auto">
            <p className="text-sm text-gray-600 mb-3">
              {searchTerm
                ? `"${searchTerm}" の検索結果 (${getFilteredTags().length}件)`
                : `全ての興味タグ (${predefinedTags.length}件) - クリックして選択`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {getFilteredTags().map((tag, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-left p-3 rounded-md border text-xs transition-all duration-200 ${
                    tags.includes(tag)
                      ? "border-purple-300 bg-purple-50 text-purple-700 shadow-sm"
                      : "border-gray-200 bg-white text-gray-700 hover:border-purple-200 hover:bg-purple-25"
                  }`}
                  disabled={isSubmitting}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex-1 leading-relaxed">{tag}</span>
                    {tags.includes(tag) && (
                      <div className="ml-2 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
            {getFilteredTags().length === 0 && (
              <p className="text-center text-gray-500 py-4">
                該当するタグが見つかりませんでした
              </p>
            )}
          </div>

          {/* 選択済みタグ表示 */}
          {tags.length > 0 && (
            <div className="border-t border-gray-200 pt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                選択済みタグ
              </h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-xs text-purple-700"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-purple-500 hover:text-purple-700"
                      disabled={isSubmitting}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 目標 */}
        <div>
          <h3 className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
            <TargetIcon className="w-4 h-4 text-emerald-600" /> 目標
          </h3>
          <div className="flex flex-col gap-2">
            {Object.values(GoalType).map((g) => (
              <label key={g} className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  checked={selectedGoals.includes(g)}
                  onChange={() => toggleGoal(g)}
                  disabled={isSubmitting}
                />
                {GOAL_LABELS[g]}
              </label>
            ))}
          </div>
        </div>

        {/* レベル・場所・所属 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              レベル
            </label>
            <select
              {...register("level")}
              className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
              disabled={isSubmitting}
            >
              {Object.values(DifficultyLevel).map((lvl) => (
                <option key={lvl} value={lvl}>
                  {DIFFICULTY_LABELS[lvl]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              場所
            </label>
            <input
              type="text"
              {...register("place")}
              className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isSubmitting}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-1">
              <Building2 className="w-4 h-4 text-sky-600" /> 所属
            </label>
            <input
              type="text"
              {...register("affiliation")}
              className="w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            保存
          </button>
        </div>
      </form>
    </div>
  );
}
