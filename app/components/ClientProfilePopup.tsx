"use client";

import React, { useState } from "react";
import { ProfilePopup, ProfileData } from "./ProfilePopup";

interface ClientProfilePopupProps {
  userId: string;
}

export function ClientProfilePopup({ userId }: ClientProfilePopupProps) {
  const [isOpen, setIsOpen] = useState(true);
  
  // プロフィール保存処理
  const handleSaveProfile = async (profileData: ProfileData) => {
    try {
      // ここでAPIを呼び出してプロフィールを保存する
      // 例: await saveUserProfile(userId, profileData);
      console.log('プロフィール保存:', userId, profileData);
      
      // 実際のAPIコールはここに実装
      // const response = await fetch('/api/profile', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ userId, ...profileData }),
      // });
      // if (!response.ok) throw new Error('プロフィールの保存に失敗しました');
      
      // 成功メッセージを表示するなどの処理
    } catch (error) {
      console.error('プロフィール保存エラー:', error);
      // エラーメッセージを表示するなどの処理
    }
  };
  
  return (
    <ProfilePopup 
      isOpen={isOpen} 
      onClose={() => setIsOpen(false)} 
      onSave={handleSaveProfile} 
    />
  );
}
