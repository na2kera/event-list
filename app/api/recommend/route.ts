import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// モックイベントデータ
const mockRecommendedEvents = [
  {
    id: "mock-event-1",
    title: "Next.js 15 新機能ハンズオンワークショップ",
    description:
      "Next.js 15の最新機能を実際に触りながら学ぶハンズオンイベントです。App Routerの新機能やServer Componentsの活用方法を実践的に学習できます。",
    eventDate: new Date("2024-02-15"),
    startTime: "19:00",
    endTime: "21:00",
    venue: "渋谷テックカフェ",
    address: "東京都渋谷区道玄坂1-12-1",
    location: "東京",
    detailUrl: "https://example.com/event-1",
    organizationId: "org-1",
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    format: "OFFLINE" as const,
    difficulty: "INTERMEDIATE" as const,
    price: 3000,
    eventType: "WORKSHOP" as const,
    organization: {
      id: "org-1",
      name: "React Tokyo",
      logo: undefined,
    },
    speakers: [
      {
        speaker: {
          id: "speaker-1",
          name: "田中 太郎",
          occupation: "Senior Frontend Developer",
          affiliation: "Tech Company Inc.",
          bio: "Next.js、Reactの開発に5年以上携わっているエンジニア",
        },
      },
    ],
    skills: [
      { id: "skill-1", name: "Next.js" },
      { id: "skill-2", name: "React" },
      { id: "skill-3", name: "TypeScript" },
    ],
    categories: [
      {
        category: { id: "cat-1", name: "フロントエンド" },
      },
    ],
    isBookmarked: false,
  },
  {
    id: "mock-event-2",
    title: "TypeScript型安全プログラミング実践",
    description:
      "TypeScriptの高度な型システムを活用して、より安全で保守性の高いコードを書く方法を学習します。実際のプロジェクトでの活用例も紹介します。",
    eventDate: new Date("2024-02-20"),
    startTime: "14:00",
    endTime: "17:00",
    venue: "オンライン",
    address: null,
    location: "オンライン",
    detailUrl: "https://example.com/event-2",
    organizationId: "org-2",
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    format: "ONLINE" as const,
    difficulty: "ADVANCED" as const,
    price: 0,
    eventType: "WORKSHOP" as const,
    organization: {
      id: "org-2",
      name: "TypeScript Community",
      logo: undefined,
    },
    speakers: [
      {
        speaker: {
          id: "speaker-2",
          name: "佐藤 花子",
          occupation: "Lead Developer",
          affiliation: "Software Solutions Ltd.",
          bio: "TypeScriptコミュニティの活動に積極的に参加している開発者",
        },
      },
    ],
    skills: [
      { id: "skill-4", name: "TypeScript" },
      { id: "skill-5", name: "JavaScript" },
      { id: "skill-6", name: "型システム" },
    ],
    categories: [
      {
        category: { id: "cat-2", name: "プログラミング言語" },
      },
    ],
    isBookmarked: false,
  },
  {
    id: "mock-event-3",
    title: "React Native アプリ開発ハッカソン",
    description:
      "チームを組んでReact Nativeを使ったモバイルアプリを開発する2日間のハッカソンです。初心者から経験者まで参加可能です。",
    eventDate: new Date("2024-02-25"),
    startTime: "10:00",
    endTime: "18:00",
    venue: "新宿コワーキングスペース",
    address: "東京都新宿区西新宿1-1-1",
    location: "東京",
    detailUrl: "https://example.com/event-3",
    organizationId: "org-3",
    createdAt: new Date(),
    updatedAt: new Date(),
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3",
    format: "OFFLINE" as const,
    difficulty: "BEGINNER" as const,
    price: 1000,
    eventType: "HACKATHON" as const,
    organization: {
      id: "org-3",
      name: "Mobile Dev Community",
      logo: undefined,
    },
    speakers: [
      {
        speaker: {
          id: "speaker-3",
          name: "山田 次郎",
          occupation: "Mobile Developer",
          affiliation: "App Development Co.",
          bio: "React Nativeを使ったアプリ開発の専門家",
        },
      },
    ],
    skills: [
      { id: "skill-7", name: "React Native" },
      { id: "skill-8", name: "Mobile Development" },
      { id: "skill-9", name: "JavaScript" },
    ],
    categories: [
      {
        category: { id: "cat-3", name: "モバイル開発" },
      },
    ],
    isBookmarked: false,
  },
];

export async function POST() {
  try {
    // セッションからユーザーIDを取得
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // モックデータを返す（実際のAPI呼び出しの代わり）
    // 実際の実装では、ユーザーのプロフィールに基づいてパーソナライズされたイベントを返すことができます
    await new Promise((resolve) => setTimeout(resolve, 1500)); // ローディング状態をテストするための遅延

    return NextResponse.json({
      success: true,
      data: mockRecommendedEvents,
    });
  } catch (error) {
    console.error("Error in recommend API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
