import React from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { Search } from "lucide-react";
import type { ChatMessage } from "../../hooks/useChat";

interface ChatSectionProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSend: (message: string) => void;
}

export function ChatSection({ messages, isLoading, onSend }: ChatSectionProps) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 px-6 py-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full mr-3">
            <Search className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-white font-semibold">テックイベント検索</h2>
            <p className="text-indigo-200 text-sm">オンライン</p>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", height: "65vh" }}>
        <MainContainer>
          <ChatContainer>
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
    </div>
  );
}
