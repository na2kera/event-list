"use client";

import React, { useState, useEffect } from "react";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profileData: ProfileData) => void;
}

export interface ProfileData {
  stack: string[];
  tags: string[];
  goal: string;
}

export function ProfilePopup({ isOpen, onClose, onSave }: ProfilePopupProps) {
  const [stack, setStack] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [goal, setGoal] = useState("");
  const [newStack, setNewStack] = useState("");
  const [newTag, setNewTag] = useState("");

  // スタック追加処理
  const handleAddStack = () => {
    if (newStack.trim() && !stack.includes(newStack.trim())) {
      setStack([...stack, newStack.trim()]);
      setNewStack("");
    }
  };

  // タグ追加処理
  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  // スタック削除処理
  const handleRemoveStack = (index: number) => {
    setStack(stack.filter((_, i) => i !== index));
  };

  // タグ削除処理
  const handleRemoveTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  // 保存処理
  const handleSave = () => {
    onSave({ stack, tags, goal });
    onClose();
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        {/* ヘッダー */}
        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">プロフィール設定</h2>
        </div>

        {/* コンテンツ */}
        <div className="p-6">
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
                onKeyPress={(e) => e.key === "Enter" && handleAddStack()}
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="例: React, TypeScript"
              />
              <button
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
                    onClick={() => handleRemoveStack(index)}
                    className="ml-2 text-indigo-600 hover:text-indigo-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
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
                onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="例: フロントエンド, AI"
              />
              <button
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
                    onClick={() => handleRemoveTag(index)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* 目標入力 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              成長目標
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
              placeholder="あなたの目標を入力してください"
            ></textarea>
          </div>

          {/* ボタン */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
