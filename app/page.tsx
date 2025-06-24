"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MessageSquare,
  Calendar,
  Search,
  X,
  // カテゴリアイコン
  Monitor,
  Server,
  Brain,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Gamepad2,
  Check,
} from "lucide-react";

interface ChatMessage {
  id: string;
  message: string;
  sentTime: string;
  sender: string;
  direction: "incoming" | "outgoing";
}

interface ModalPosition {
  top: number;
  left: number;
}

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      message:
        "こんにちは！テックイベント推薦システムです。🚀\n\n最新の技術イベントをお探しですか？\n下のカテゴリから選ぶか、自由にご希望をお聞かせください！",
      sentTime: "just now",
      sender: "System",
      direction: "incoming",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [modalPosition, setModalPosition] = useState<ModalPosition>({
    top: 0,
    left: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

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

    randomEvents.forEach((event, index) => {
      response += `🚀 **${event.title}**\n`;
      response += `📅 ${event.date}\n`;
      response += `📍 ${event.location}\n`;
      response += `💡 ${event.description}\n\n`;
    });

    response +=
      "他にも条件を追加して検索できます。何かご希望があればお聞かせください！";

    return response;
  };

  const handleCategorySelect = (
    categoryId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const modalMaxWidth = 320; // w-80

    // Calculate left position
    let left = buttonRect.right + 16;
    if (left + modalMaxWidth > viewportWidth - 16) {
      left = buttonRect.left - modalMaxWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    // Calculate top position
    let top = buttonRect.top;
    if (top < 16) {
      top = 16;
    }
    // We can't know the height before rendering, but we can set a max-height
    // and prevent it from overflowing the bottom if we make an assumption.
    // For now, simple top alignment is better.

    setModalPosition({ top, left });
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  const handleTechnologyToggle = (technology: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(technology)
        ? prev.filter((t) => t !== technology)
        : [...prev, technology]
    );
  };

  const handleRemoveTechnology = (technology: string) => {
    setSelectedTechnologies((prev) => prev.filter((t) => t !== technology));
  };

  const handleSearchWithSelected = () => {
    if (selectedTechnologies.length === 0) return;
    handleSend(`${selectedTechnologies.join(", ")} のイベントを探しています`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const getSelectedCategoryData = () => {
    if (!selectedCategory) return null;
    return techCategories.find((cat) => cat.id === selectedCategory);
  };

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isModalOpen]);

  // モーダル外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // クリックがモーダル自身か、カテゴリボタンでない場合のみ閉じる
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(
          'button[data-category-button="true"]'
        )
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isModalOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-900">
      {/* ヘッダーセクション */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-indigo-500/20 rounded-full mb-6">
            <Calendar className="h-8 w-8 text-indigo-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            テックイベント推薦システム
          </h1>
          <p className="text-xl text-indigo-200 mb-8 max-w-3xl mx-auto">
            最新の技術イベントを見つけましょう。
            興味のある技術分野やキーワードを教えてください。
          </p>
        </div>
      </div>

      {/* チャット画面 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
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
                  onSend={handleSend}
                  disabled={isLoading}
                  attachButton={false}
                  sendButton={true}
                />
              </ChatContainer>
            </MainContainer>
          </div>
        </div>

        {/* Selected Technologies Chips */}
        {selectedTechnologies.length > 0 && (
          <div className="mt-8">
            <h3 className="text-white text-lg font-semibold mb-4">
              選択中の技術
            </h3>
            <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-white/10 border border-white/20">
              {selectedTechnologies.map((tech) => (
                <div
                  key={tech}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-600 text-white"
                >
                  <span>{tech}</span>
                  <button
                    onClick={() => handleRemoveTechnology(tech)}
                    className="p-0.5 rounded-full hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={handleSearchWithSelected}
                className="ml-auto flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors"
              >
                <Search className="h-4 w-4 mr-2" />
                <span>選択した技術で検索</span>
              </button>
            </div>
          </div>
        )}

        {/* キーワード選択ボタン */}
        <div className="mt-8">
          <h3 className="text-white text-lg font-semibold mb-4 text-center">
            技術分野から選択
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {techCategories.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  data-category-button="true"
                  onClick={(e) => handleCategorySelect(item.id, e)}
                  disabled={isLoading}
                  className="group p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                      <Icon className="h-5 w-5 text-indigo-300" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-medium text-sm group-hover:text-indigo-200 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-indigo-200 text-xs">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 使い方ガイド */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              テックイベント検索の使い方
            </h2>
            <p className="text-indigo-200">以下のような条件で検索できます</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchExamples.map((example) => (
              <div key={example.id} className="text-center">
                <div className="text-3xl mb-3">{example.icon}</div>
                <h3 className="text-white font-semibold mb-2">
                  {example.title}
                </h3>
                <p className="text-indigo-200 text-sm">{example.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 技術選択モーダル */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          {/* オーバーレイ */}
          <div
            className="fixed inset-0 bg-black/30 transition-opacity"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* モーダルコンテンツ */}
          <div
            ref={modalRef}
            className="absolute bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-auto max-w-lg"
            style={{
              top: `${modalPosition.top}px`,
              left: `${modalPosition.left}px`,
              transform: "translateZ(0)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getSelectedCategoryData() && (
                  <>
                    <div className="rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100">
                      {React.createElement(getSelectedCategoryData()!.icon, {
                        className: "h-4 w-4 text-indigo-600",
                      })}
                    </div>
                    <h3
                      id="modal-title"
                      className="text-lg font-semibold text-gray-900"
                    >
                      {getSelectedCategoryData()!.name}
                    </h3>
                  </>
                )}
              </div>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto -mr-2 pr-2">
              <div className="flex flex-wrap gap-2">
                {getSelectedCategoryData()?.technologies.map((tech) => {
                  const isSelected = selectedTechnologies.includes(tech.name);
                  return (
                    <button
                      key={tech.id}
                      onClick={() => handleTechnologyToggle(tech.name)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-200"
                      }`}
                    >
                      {isSelected && <Check className="h-4 w-4" />}
                      {tech.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                複数選択可能。選択後、モーダルを閉じてください。
              </p>
            </div>
          </div>
        </div>
      )}

      {/* カスタムスタイル */}
      <style jsx global>{`
        .cs-message-list {
          background: transparent !important;
        }

        .cs-message--incoming .cs-message__content {
          background: linear-gradient(
            135deg,
            #f8fafc 0%,
            #e2e8f0 100%
          ) !important;
          border: 1px solid #e2e8f0 !important;
          color: #1e293b !important;
          white-space: pre-line !important;
        }

        .cs-message--outgoing .cs-message__content {
          background: linear-gradient(
            135deg,
            #4f46e5 0%,
            #6366f1 100%
          ) !important;
          border: none !important;
          color: white !important;
        }

        .cs-message-input {
          background: rgba(255, 255, 255, 0.95) !important;
          border-top: 1px solid #e2e8f0 !important;
        }

        .cs-message-input__content-editor {
          color: #1e293b !important;
        }

        .cs-button--send {
          background: linear-gradient(
            135deg,
            #4f46e5 0%,
            #6366f1 100%
          ) !important;
        }

        .cs-typing-indicator {
          background: transparent !important;
        }
      `}</style>
    </div>
  );
}

// 技術カテゴリと詳細技術の階層構造
const techCategories = [
  {
    id: "frontend",
    name: "フロントエンド",
    description: "UI/UX開発",
    icon: Monitor,
    technologies: [
      { id: "typescript", name: "TypeScript", icon: Monitor },
      { id: "react", name: "React", icon: Monitor },
      { id: "nextjs", name: "Next.js", icon: Monitor },
      { id: "javascript", name: "JavaScript", icon: Monitor },
      { id: "vue", name: "Vue.js", icon: Monitor },
      { id: "angular", name: "Angular", icon: Monitor },
      { id: "tailwind", name: "Tailwind CSS", icon: Monitor },
      { id: "sass", name: "Sass/SCSS", icon: Monitor },
    ],
  },
  {
    id: "backend",
    name: "バックエンド",
    description: "サーバーサイド開発",
    icon: Server,
    technologies: [
      { id: "go", name: "Go", icon: Server },
      { id: "ruby", name: "Ruby on Rails", icon: Server },
      { id: "laravel", name: "Laravel", icon: Server },
      { id: "nodejs", name: "Node.js", icon: Server },
      { id: "python", name: "Python", icon: Server },
      { id: "java", name: "Java", icon: Server },
      { id: "csharp", name: "C#", icon: Server },
      { id: "php", name: "PHP", icon: Server },
    ],
  },
  {
    id: "ai",
    name: "AI・機械学習",
    description: "人工知能・ML",
    icon: Brain,
    technologies: [
      { id: "chatgpt", name: "ChatGPT", icon: Brain },
      { id: "claude", name: "Claude", icon: Brain },
      { id: "gemini", name: "Gemini", icon: Brain },
      { id: "tensorflow", name: "TensorFlow", icon: Brain },
      { id: "pytorch", name: "PyTorch", icon: Brain },
      { id: "langchain", name: "LangChain", icon: Brain },
      { id: "huggingface", name: "Hugging Face", icon: Brain },
      { id: "openai", name: "OpenAI API", icon: Brain },
    ],
  },
  {
    id: "mobile",
    name: "モバイル開発",
    description: "iOS・Android",
    icon: Smartphone,
    technologies: [
      { id: "reactnative", name: "React Native", icon: Smartphone },
      { id: "flutter", name: "Flutter", icon: Smartphone },
      { id: "swift", name: "Swift", icon: Smartphone },
      { id: "kotlin", name: "Kotlin", icon: Smartphone },
      { id: "ionic", name: "Ionic", icon: Smartphone },
      { id: "xamarin", name: "Xamarin", icon: Smartphone },
    ],
  },
  {
    id: "database",
    name: "データベース",
    description: "データ管理・分析",
    icon: Database,
    technologies: [
      { id: "postgresql", name: "PostgreSQL", icon: Database },
      { id: "mysql", name: "MySQL", icon: Database },
      { id: "mongodb", name: "MongoDB", icon: Database },
      { id: "redis", name: "Redis", icon: Database },
      { id: "elasticsearch", name: "Elasticsearch", icon: Database },
      { id: "prisma", name: "Prisma", icon: Database },
    ],
  },
  {
    id: "cloud",
    name: "クラウド・インフラ",
    description: "AWS・GCP・Azure",
    icon: Cloud,
    technologies: [
      { id: "aws", name: "AWS", icon: Cloud },
      { id: "gcp", name: "Google Cloud", icon: Cloud },
      { id: "azure", name: "Microsoft Azure", icon: Cloud },
      { id: "docker", name: "Docker", icon: Cloud },
      { id: "kubernetes", name: "Kubernetes", icon: Cloud },
      { id: "terraform", name: "Terraform", icon: Cloud },
    ],
  },
  {
    id: "security",
    name: "セキュリティ",
    description: "情報セキュリティ",
    icon: Shield,
    technologies: [
      { id: "cybersecurity", name: "サイバーセキュリティ", icon: Shield },
      { id: "authentication", name: "認証・認可", icon: Shield },
      { id: "oauth", name: "OAuth", icon: Shield },
      { id: "jwt", name: "JWT", icon: Shield },
    ],
  },
  {
    id: "game",
    name: "ゲーム開発",
    description: "ゲーム・エンタメ",
    icon: Gamepad2,
    technologies: [
      { id: "unity", name: "Unity", icon: Gamepad2 },
      { id: "unrealengine", name: "Unreal Engine", icon: Gamepad2 },
      { id: "godot", name: "Godot", icon: Gamepad2 },
      { id: "webgl", name: "WebGL", icon: Gamepad2 },
    ],
  },
];

const searchExamples = [
  {
    id: 1,
    icon: "📅",
    title: "日時指定",
    description: "「今週末」「来月」など",
  },
  {
    id: 2,
    icon: "📍",
    title: "場所指定",
    description: "「渋谷」「オンライン」など",
  },
  {
    id: 3,
    icon: "🎯",
    title: "難易度",
    description: "「初心者向け」「上級者」など",
  },
  {
    id: 4,
    icon: "👥",
    title: "規模・形式",
    description: "「ハンズオン」「ハッカソン」など",
  },
];
