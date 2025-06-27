"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { GoalType, GOAL_LABELS } from "types/enums";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profileData: ProfileData) => void;
  initialData?: {
    stack?: string[];
    tags?: string[];
    goals?: GoalType[];
  };
}

export interface ProfileData {
  stack: string[];
  tags: string[];
  goals: GoalType[];
}

const profileSchema = z.object({
  stack: z.array(z.string()),
  tags: z.array(z.string()),
  goals: z
    .array(z.nativeEnum(GoalType))
    .min(1, "少なくとも1つの目標を選択してください"),
});

export function ProfilePopup({
  isOpen,
  onClose,
  onSave,
  initialData,
}: ProfilePopupProps) {
  const [newStack, setNewStack] = useState("");
  const [newTag, setNewTag] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success",
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      stack: initialData?.stack || [],
      tags: initialData?.tags || [],
      goals: initialData?.goals || [GoalType.IMPROVE_SKILLS],
    },
  });

  const stack = watch("stack");
  const tags = watch("tags");
  const goals = watch("goals");

  // スタック追加処理
  const handleAddStack = () => {
    if (newStack.trim() && !stack.includes(newStack.trim())) {
      setValue("stack", [...stack, newStack.trim()]);
      setNewStack("");
    }
  };

  // タグ追加処理
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setValue("tags", [...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  // スタック削除処理
  const handleRemoveStack = (index: number) => {
    setValue(
      "stack",
      stack.filter((_, i) => i !== index)
    );
  };

  // タグ削除処理
  const handleRemoveTag = (index: number) => {
    setValue(
      "tags",
      tags.filter((_, i) => i !== index)
    );
  };

  // 目標の切り替え処理
  const toggleGoal = (goalType: GoalType) => {
    const isSelected = goals.includes(goalType);
    if (isSelected && goals.length > 1) {
      // 選択済みで、他にも選択されている場合は削除
      setValue(
        "goals",
        goals.filter((g) => g !== goalType)
      );
    } else if (!isSelected) {
      // 未選択の場合は追加
      setValue("goals", [...goals, goalType]);
    }
  };

  // フォーム送信処理
  const onSubmit = (data: ProfileData) => {
    setSubmitting(true);
    try {
      onSave(data);
      setToast({
        show: true,
        message: "プロフィールを保存しました",
        type: "success",
      });
      setTimeout(() => {
        onClose();
      }, 1000);
    } catch (err) {
      console.error("Error saving profile:", err);
      setToast({
        show: true,
        message: "保存に失敗しました",
        type: "error",
      });
      setSubmitting(false);
    }
  };

  // トースト閉じる処理
  const handleCloseToast = () => {
    setToast({ ...toast, show: false });
  };

  // Escキーでポップアップを閉じる
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-transparent pointer-events-none"></div>
      <div className="bg-white shadow-xl w-full max-w-md mx-4 overflow-hidden relative z-10 border border-indigo-200 rounded-lg pointer-events-auto">
        {/* ヘッダー */}
        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">プロフィール設定</h2>
        </div>

        {/* トースト通知 */}
        {toast.show && (
          <div
            className={`p-3 ${
              toast.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            } flex justify-between items-center`}
          >
            <span>{toast.message}</span>
            <button
              onClick={handleCloseToast}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        )}

        {/* コンテンツ */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {/* スタック入力 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              技術スタック
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                value={newStack}
                onChange={(e) => setNewStack(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddStack())
                }
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="例: React, TypeScript"
              />
              <button
                type="button"
                onClick={handleAddStack}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
              >
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.map((item, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {item}
                  <button
                    type="button"
                    onClick={() => handleRemoveStack(index)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.stack && (
              <p className="text-red-500 text-sm mt-1">
                {errors.stack.message}
              </p>
            )}
          </div>
          {/* タグ入力 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              興味のあるタグ
            </label>
            <div className="flex mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddTag())
                }
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="例: フロントエンド, AI"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700"
              >
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
            )}
          </div>
          {/* 目標選択（複数選択可能） */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              成長目標（複数選択可能）
            </label>
            <div className="space-y-2">
              {Object.entries(GOAL_LABELS).map(([goalType, label]) => {
                const goalTypeEnum = goalType as GoalType;
                const isChecked = goals.includes(goalTypeEnum);

                return (
                  <label
                    key={goalType}
                    className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded-md"
                  >
                    <input
                      type="checkbox"
                      name="goals"
                      value={goalType}
                      checked={isChecked}
                      onChange={() => toggleGoal(goalTypeEnum)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                    />
                    <span className="text-gray-700">{label}</span>
                  </label>
                );
              })}
            </div>
            {errors.goals && (
              <p className="text-red-500 text-sm mt-1">
                {errors.goals.message}
              </p>
            )}
          </div>
          {/* ボタン */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
              disabled={submitting}
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              disabled={submitting}
            >
              {submitting ? "保存中..." : "保存"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
