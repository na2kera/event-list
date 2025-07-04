import React, { useState } from "react";
import {
  ChatContainer,
  MessageList,
  Message,
  TypingIndicator,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { HoverableSidebar } from "./HoverableSidebar";
import { EventCarousel } from "./EventCarousel";
import type { ChatMessage } from "../../hooks/useChat";

interface ChatSectionProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSend: (message: string) => void;
  selectedTechnologies: string[];
  onCategorySelect: (
    categoryId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onRemoveTechnology: (technology: string) => void;
  onSearchWithSelected: () => void;
}

export function ChatSection({
  messages,
  isLoading,
  onSend,
  selectedTechnologies,
  onCategorySelect,
  onRemoveTechnology,
  onSearchWithSelected,
}: ChatSectionProps) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      onSend(inputMessage.trim());
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="h-full flex">
      {/* ホバー対応サイドバー */}
      <HoverableSidebar
        selectedTechnologies={selectedTechnologies}
        isLoading={isLoading}
        onCategorySelect={onCategorySelect}
        onRemoveTechnology={onRemoveTechnology}
        onSearchWithSelected={onSearchWithSelected}
      />

      {/* メインチャットエリア */}
      <div className="flex-1 md:ml-16 h-full flex flex-col">
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Content
              userName="イベント検索Bot"
              info="興味のある技術分野を選択するか、テキストで質問してください"
            />
          </ConversationHeader>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              isLoading ? (
                <TypingIndicator content="イベントを検索中..." />
              ) : null
            }
            style={{ paddingBottom: "100px", marginTop: "30px" }}
          >
            {messages.map((message) => (
              <div key={message.id}>
                <Message
                  model={{
                    message: message.message,
                    sentTime: message.sentTime,
                    sender: message.sender,
                    direction: message.direction,
                    position: "single",
                  }}
                />
                {/* レコメンドされたイベントがある場合はカルーセルを表示 */}
                {message.events && message.events.length > 0 && (
                  <div className="mt-4 px-4 -mx-4">
                    <EventCarousel
                      events={message.events}
                      recommendReasons={message.recommendReasons}
                    />
                  </div>
                )}
              </div>
            ))}
          </MessageList>
        </ChatContainer>

        {/* 独自実装のチャット入力フォーム */}
        <div className="fixed bottom-0 left-0 right-0 md:left-16 bg-white border-t border-gray-200 p-4 z-10">
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            <div className="flex items-stretch gap-3">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="技術やイベントの条件を入力してください..."
                  className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={1}
                  disabled={isLoading}
                  style={{ maxHeight: "120px" }}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="h-12 w-12 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
