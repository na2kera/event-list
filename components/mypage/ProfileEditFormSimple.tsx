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
  const [tagInput, setTagInput] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<GoalType[]>(
    (initialData.goal || []) as GoalType[]
  );

  const addStack = () => {
    if (newStack.trim() && !stacks.includes(newStack.trim())) {
      setStacks([...stacks, newStack.trim()]);
      setNewStack("");
    }
  };
  const removeStack = (s: string) => {
    setStacks(stacks.filter((i) => i !== s));
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };
  const removeTag = (t: string) => {
    setTags(tags.filter((i) => i !== t));
  };

  const toggleGoal = (g: GoalType) => {
    setSelectedGoals((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
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
    <div className="mx-auto max-w-xl bg-white rounded-3xl shadow p-8">
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
              <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
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

        {/* 興味タグ */}
        <div>
          <h3 className="flex items-center gap-1 text-sm font-medium text-gray-700 mb-2">
            <TagIcon className="w-4 h-4 text-purple-600" /> 興味タグ
          </h3>
          <div className="flex gap-2 mb-2">
            <input
              list="tag-options"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              className="flex-grow rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="タグを入力"
              disabled={isSubmitting}
            />
            <datalist id="tag-options">
              {predefinedTags.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-1 rounded-md bg-purple-600 text-white text-sm hover:bg-purple-700"
              disabled={isSubmitting}
            >
              追加
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 text-xs text-purple-700"
              >
                {t}
                <button
                  type="button"
                  onClick={() => removeTag(t)}
                  className="ml-1 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
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
