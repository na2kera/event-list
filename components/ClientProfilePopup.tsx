"use client";

import React, { useState, useEffect } from "react";
import { ProfilePopup, ProfileData } from "./ProfilePopup";
import { saveUserProfile } from "lib/api/client.ts/profileApi";
import { getUserProfile } from "lib/api/client.ts/userApi";
import { GoalType } from "types/enums";

interface ClientProfilePopupProps {
  userId: string;
}

export function ClientProfilePopup({ userId }: ClientProfilePopupProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [initialData, setInitialData] = useState<{
    stack?: string[];
    tags?: string[];
    goals?: GoalType[];
  }>({ stack: [], tags: [], goals: [] });
  const [isLoading, setIsLoading] = useState(true);

  // 初期データの取得
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const userProfile = await getUserProfile(userId);
        setInitialData({
          stack: userProfile.stack || [],
          tags: userProfile.tag || [],
          goals: (userProfile.goal || []).map((g) => g as GoalType),
        });
      } catch (error) {
        console.error("ユーザープロフィール取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  // プロフィール保存処理
  const handleSaveProfile = async (profileData: ProfileData) => {
    try {
      // APIを呼び出してプロフィールを保存
      await saveUserProfile(userId, profileData);
      console.log("プロフィール保存成功:", userId, profileData);
      return true;
    } catch (error) {
      console.error("プロフィール保存エラー:", error);
      throw error;
    }
  };

  if (isLoading) {
    return null; // ローディング中は何も表示しない
  }

  return (
    <ProfilePopup
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onSave={handleSaveProfile}
      initialData={initialData}
    />
  );
}
