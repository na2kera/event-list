import { useState, useEffect } from "react";
import { fetchEventRecommendations } from "lib/api/server.ts/serverApi";
import { Event } from "@/types";

export interface ChatMessage {
  id: string;
  message: string;
  sentTime: string;
  sender: string;
  direction: "incoming" | "outgoing";
  events?: Event[];
  recommendReasons?: string[];
}

export interface ChatSendPayload {
  message: string;
  tags: string[];
}

const initialMessage: ChatMessage = {
  id: "1",
  message:
    "こんにちは！テックイベント推薦システムです。🚀\n\n最新の技術イベントをお探しですか？左のサイドバーからキーワードを選ぶか、自由にご希望をお聞かせください！",
  sentTime: "just now",
  sender: "System",
  direction: "incoming",
};

const CHAT_STORAGE_KEY = "tech-event-chat-history";

// sessionStorageからチャット履歴を復元
const loadChatHistory = (): ChatMessage[] => {
  if (typeof window === "undefined") return [initialMessage];

  try {
    const stored = sessionStorage.getItem(CHAT_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // 保存されたデータが配列で、最低限の形式を満たしているかチェック
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (error) {
    console.warn("チャット履歴の復元に失敗しました:", error);
  }

  return [initialMessage];
};

// sessionStorageにチャット履歴を保存
const saveChatHistory = (messages: ChatMessage[]) => {
  if (typeof window === "undefined") return;

  try {
    sessionStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.warn("チャット履歴の保存に失敗しました:", error);
  }
};

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    loadChatHistory()
  );
  const [isLoading, setIsLoading] = useState(false);

  // メッセージが更新されるたびにsessionStorageに保存
  useEffect(() => {
    saveChatHistory(messages);
  }, [messages]);

  const handleSend = async ({ message, tags }: ChatSendPayload) => {
    // ユーザーメッセージを追加
    let userMessageText = message;
    if (tags && tags.length > 0) {
      if (userMessageText) {
        userMessageText = userMessageText + "・" + tags.join("・");
      } else {
        userMessageText = tags.join("・");
      }
    }
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      message: userMessageText,
      sentTime: "just now",
      sender: "You",
      direction: "outgoing",
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      // バックエンド API でレコメンド取得
      const data = await fetchEventRecommendations(message, tags);

      // レコメンド理由を生成
      const recommendReasons = data.recommendations
        .slice(0, 5)
        .map((_, idx) => {
          const reasons = [
            "あなたの興味分野と一致する技術イベントです",
            "スキルレベルに適した内容となっています",
            "開催時期が最適で参加しやすいイベントです",
            "実践的な学習ができるワークショップ形式です",
            "コミュニティ交流も楽しめるイベントです",
          ];
          return reasons[idx % reasons.length];
        });

      let systemResponse: ChatMessage;
      if (!data.recommendations || data.recommendations.length === 0) {
        systemResponse = {
          id: (Date.now() + 1).toString(),
          message:
            "ご希望に合うイベントが見つかりませんでした。条件を変えて再度お試しください。",
          sentTime: "just now",
          sender: "System",
          direction: "incoming",
        };
      } else {
        systemResponse = {
          id: (Date.now() + 1).toString(),
          message: `「${data.query}」に関連するイベントを見つけました！✨`,
          sentTime: "just now",
          sender: "System",
          direction: "incoming",
          events: data.recommendations.slice(0, 5).map((rec) => {
            const ev =
              (rec as unknown as { event?: Event } & Event).event ?? rec;
            return ev as Event;
          }),
          recommendReasons,
        };
      }

      setMessages((prevMessages) => [...prevMessages, systemResponse]);
      setIsLoading(false);
    } catch (error) {
      console.error("イベント検索エラー:", error);
      // モックイベントデータを生成
      const mockEvents = [
        {
          id: "mock-1",
          title: "React 19 新機能ハンズオン",
          description: "React 19の新機能を実際に触りながら学びます",
          eventDate: new Date("2024-01-15"),
          startTime: "19:00",
          endTime: "21:00",
          venue: "渋谷テックカフェ",
          location: "渋谷テックカフェ",
          organizationId: "mock-org",
          createdAt: new Date(),
          updatedAt: new Date(),
          format: "OFFLINE",
          difficulty: "BEGINNER",
          price: 0,
          eventType: "WORKSHOP",
          image:
            "https://via.placeholder.com/600x270/3B82F6/FFFFFF?text=React+Event",
        },
        {
          id: "mock-2",
          title: "Next.js App Router実践セミナー",
          description: "Next.js 14のApp Routerを使った実践的な開発方法",
          eventDate: new Date("2024-01-18"),
          startTime: "14:00",
          endTime: "17:00",
          venue: "オンライン",
          location: "オンライン",
          organizationId: "mock-org",
          createdAt: new Date(),
          updatedAt: new Date(),
          format: "ONLINE",
          difficulty: "INTERMEDIATE",
          price: 0,
          eventType: "WORKSHOP",
          image:
            "https://via.placeholder.com/600x270/10B981/FFFFFF?text=Next.js+Event",
        },
      ] as unknown as Event[];

      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: `「${message}」に関連するイベントを見つけました！✨\n⚠️ 本番 API でエラーが発生したためモックデータを表示しています。`,
        sentTime: "just now",
        sender: "System",
        direction: "incoming",
        events: mockEvents,
        recommendReasons: [
          "あなたの興味分野と一致する技術イベントです",
          "スキルレベルに適した内容となっています",
        ],
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    handleSend,
  };
};
