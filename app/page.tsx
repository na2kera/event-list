"use client";

import React from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

// カスタムフック
import { useChat } from "../hooks/useChat";
import { useTechSelection } from "../hooks/useTechSelection";

// コンポーネント
import { ChatSection } from "../components/chat/ChatSection";
import { TechSelectionModal } from "../components/tech/TechSelectionModal";
import { ChatStyles } from "../components/ChatStyles";
import { Header } from "../components/layout/Header";

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
    handleSend({ message: "", tags: selectedTechnologies });
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <ChatSection
          messages={messages}
          isLoading={isLoading}
          onSend={(payload) => handleSend(payload)}
          selectedTechnologies={selectedTechnologies}
          onCategorySelect={handleCategorySelect}
          onRemoveTechnology={handleRemoveTechnology}
          onSearchWithSelected={handleSearchWithSelected}
          handleTechnologyToggle={handleTechnologyToggle}
        />
      </div>
      <TechSelectionModal
        isOpen={isModalOpen}
        position={modalPosition}
        categoryData={getSelectedCategoryData()}
        selectedTechnologies={selectedTechnologies}
        modalRef={modalRef}
        onClose={closeModal}
        onTechnologyToggle={handleTechnologyToggle}
      />
      <ChatStyles />
    </div>
  );
}
