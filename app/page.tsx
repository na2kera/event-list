"use client";

import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

// カスタムフック
import { useChat } from "../hooks/useChat";
import { useTechSelection } from "../hooks/useTechSelection";

// コンポーネント
import { Header } from "../components/Header";
import { ChatSection } from "../components/chat/ChatSection";
import { SelectedTechnologies } from "../components/tech/SelectedTechnologies";
import { TechCategorySection } from "../components/tech/TechCategorySection";
import { TechSelectionModal } from "../components/tech/TechSelectionModal";
import { UsageGuide } from "../components/UsageGuide";
import { ChatStyles } from "../components/ChatStyles";

export default function Home() {
  // カスタムフック
  const { messages, isLoading, handleSend } = useChat();
  const {
    selectedTechnologies,
    modalPosition,
    isModalOpen,
    modalRef,
    handleCategorySelect,
    handleTechnologyToggle,
    handleRemoveTechnology,
    closeModal,
    getSelectedCategoryData,
  } = useTechSelection();

  const handleSearchWithSelected = () => {
    if (selectedTechnologies.length === 0) return;
    handleSend(`${selectedTechnologies.join(", ")} のイベントを探しています`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900">
      {/* ヘッダーセクション */}
      <Header />

      {/* チャット画面 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <ChatSection
          messages={messages}
          isLoading={isLoading}
          onSend={handleSend}
        />

        {/* 選択済み技術チップス */}
        <SelectedTechnologies
          selectedTechnologies={selectedTechnologies}
          onRemoveTechnology={handleRemoveTechnology}
          onSearchWithSelected={handleSearchWithSelected}
        />

        {/* 技術分野選択ボタン */}
        <TechCategorySection
          isLoading={isLoading}
          onCategorySelect={handleCategorySelect}
        />

        {/* 使い方ガイド */}
        <UsageGuide />
      </div>

      {/* 技術選択モーダル */}
      <TechSelectionModal
        isOpen={isModalOpen}
        position={modalPosition}
        categoryData={getSelectedCategoryData()}
        selectedTechnologies={selectedTechnologies}
        modalRef={modalRef}
        onClose={closeModal}
        onTechnologyToggle={handleTechnologyToggle}
      />

      {/* カスタムスタイル */}
      <ChatStyles />
    </div>
  );
}
