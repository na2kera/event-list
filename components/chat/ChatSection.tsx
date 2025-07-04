import React from "react";
import {
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
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
      <div className="flex-1 md:ml-16 h-full">
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
            style={{ paddingBottom: "100px" }}
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

        {/* 固定位置のチャット入力フォーム */}
        <div className="fixed-chat-input">
          <MessageInput
            placeholder="技術やイベントの条件を入力してください..."
            onSend={onSend}
            disabled={isLoading}
            attachButton={false}
            sendButton={true}
          />
        </div>
      </div>
    </div>
  );
}
