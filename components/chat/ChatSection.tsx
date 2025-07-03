import React from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  Sidebar,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { SelectedTechnologies } from "../tech/SelectedTechnologies";
import { TechCategorySection } from "../tech/TechCategorySection";
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
    <div className="h-full">
      <MainContainer responsive style={{ height: "100%" }}>
        <Sidebar position="left" scrollable={false}>
          <div className="p-4 flex flex-col h-full">
            <div className="pb-4 border-b border-gray-200">
              <TechCategorySection
                isLoading={isLoading}
                onCategorySelect={onCategorySelect}
              />
            </div>
            <div className="pt-4">
              <h2 className="text-sm font-semibold mb-2 text-gray-600 px-2">
                選択中の技術
              </h2>
              <SelectedTechnologies
                selectedTechnologies={selectedTechnologies}
                onRemoveTechnology={onRemoveTechnology}
                onSearchWithSelected={onSearchWithSelected}
              />
            </div>
            <div className="flex-grow"></div>
          </div>
        </Sidebar>

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
          >
            {messages.map((message) => (
              <Message
                key={message.id}
                model={{
                  message: message.message,
                  sentTime: message.sentTime,
                  sender: message.sender,
                  direction: message.direction,
                  position: "single",
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="技術やイベントの条件を入力してください..."
            onSend={onSend}
            disabled={isLoading}
            attachButton={false}
            sendButton={true}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
