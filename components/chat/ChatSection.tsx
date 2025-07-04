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
  onSend: (payload: { message: string; tags: string[] }) => void;
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
  handleTechnologyToggle,
}: ChatSectionProps & { handleTechnologyToggle: (tag: string) => void }) {
  const [inputMessage, setInputMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (inputMessage.trim() || selectedTechnologies.length > 0) &&
      !isLoading
    ) {
      onSend({ message: inputMessage.trim(), tags: selectedTechnologies });
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleTagClick = () => {
    // 何もしない
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
        onTechnologyToggle={handleTechnologyToggle}
        onTagClick={handleTagClick}
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
          {isLoading && (
            <div className="flex items-center justify-center mb-2 text-blue-600 text-sm">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-blue-500"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              検索中...
            </div>
          )}
          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
            {/* タグUI表示（入力欄上のみ） */}
            {selectedTechnologies.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {selectedTechnologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => onRemoveTechnology(tech)}
                      className="p-0.5 rounded-full hover:bg-indigo-200 transition-colors"
                    >
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-stretch gap-3">
              <div className="flex-1">
                {/* テキストインプットは常に表示 */}
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
                disabled={
                  isLoading ||
                  (selectedTechnologies.length === 0 && !inputMessage.trim())
                }
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
