import { useState } from "react";

export interface ChatMessage {
  id: string;
  message: string;
  sentTime: string;
  sender: string;
  direction: "incoming" | "outgoing";
}

const initialMessage: ChatMessage = {
  id: "1",
  message:
    "こんにちは！テックイベント推薦システムです。🚀\n\n最新の技術イベントをお探しですか？\n下のカテゴリから選ぶか、自由にご希望をお聞かせください！",
  sentTime: "just now",
  sender: "System",
  direction: "incoming",
};

// モックイベントレスポンス生成（実際のAPIレスポンス時は削除）
const generateMockEventResponse = (query: string): string => {
  const mockEvents = [
    {
      title: "React 19 新機能ハンズオン",
      date: "2024年1月15日 19:00-21:00",
      location: "渋谷テックカフェ",
      description: "React 19の新機能を実際に触りながら学びます",
    },
    {
      title: "Next.js App Router実践セミナー",
      date: "2024年1月18日 14:00-17:00",
      location: "オンライン",
      description: "Next.js 14のApp Routerを使った実践的な開発方法",
    },
    {
      title: "TypeScript型安全プログラミング",
      date: "2024年1月22日 10:00-16:00",
      location: "新宿コワーキングスペース",
      description: "TypeScriptの高度な型システムを学ぶワークショップ",
    },
    {
      title: "Go言語マイクロサービス設計",
      date: "2024年1月25日 13:00-18:00",
      location: "六本木ヒルズ",
      description: "Goを使ったマイクロサービスアーキテクチャの実装",
    },
    {
      title: "ChatGPT API活用ハッカソン",
      date: "2024年1月27日 10:00-20:00",
      location: "渋谷スカイ",
      description: "OpenAI APIを使ったアプリケーション開発コンテスト",
    },
  ];

  const randomEvents = mockEvents.sort(() => 0.5 - Math.random()).slice(0, 2);

  let response = `「${query}」に関連するテックイベントを見つけました！✨\n\n`;

  randomEvents.forEach((event) => {
    response += `🚀 **${event.title}**\n`;
    response += `📅 ${event.date}\n`;
    response += `📍 ${event.location}\n`;
    response += `💡 ${event.description}\n\n`;
  });

  response +=
    "他にも条件を追加して検索できます。何かご希望があればお聞かせください！";

  return response;
};

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string) => {
    // ユーザーメッセージを追加
    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      message: message,
      sentTime: "just now",
      sender: "You",
      direction: "outgoing",
    };

    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setIsLoading(true);

    try {
      // API呼び出し（今回はコメントのみ）
      // const response = await fetch('/api/recommend-events', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     query: message,
      //     userId: session?.user?.id // ユーザーIDがある場合
      //   })
      // });
      //
      // const data = await response.json();

      // 現在はモックレスポンス
      setTimeout(() => {
        const mockResponse = generateMockEventResponse(message);
        const systemResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          message: mockResponse,
          sentTime: "just now",
          sender: "System",
          direction: "incoming",
        };

        setMessages((prevMessages) => [...prevMessages, systemResponse]);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      console.error("イベント検索エラー:", error);
      const errorResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message:
          "申し訳ございません。イベントの検索中にエラーが発生しました。もう一度お試しください。",
        sentTime: "just now",
        sender: "System",
        direction: "incoming",
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
