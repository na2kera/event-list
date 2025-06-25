import {
  Monitor,
  Server,
  Brain,
  Smartphone,
  Database,
  Cloud,
  Shield,
  Gamepad2,
} from "lucide-react";

export interface Technology {
  id: string;
  name: string;
  icon: typeof Monitor;
}

export interface TechCategory {
  id: string;
  name: string;
  description: string;
  icon: typeof Monitor;
  technologies: Technology[];
}

export const techCategories: TechCategory[] = [
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

export interface SearchExample {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export const searchExamples: SearchExample[] = [
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
