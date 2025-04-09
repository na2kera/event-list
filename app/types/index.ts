export type Organization = {
  logo: string | undefined;
  id: string;
  name: string;
  description?: string;
  website?: string;
  email?: string;
};

export type Event = {
  id: string;
  title: string;
  description?: string;
  eventDate: Date;
  startTime: string;
  endTime?: string;
  venue: string;
  address?: string;
  location?: string;
  detailUrl?: string;
  organizationId: string;
  eventType?: string;
  skills: { id: string; name: string }[];
  speakers: { id: string; speakerId: string; speaker: Speaker }[];
  categories: { id: string; categoryId: string; category: Category }[];
  // 拡張フィールド
  image?: string;
  participants?: number;
  spots?: number;
  success_rate?: string;
  portfolio_rate?: string;
  learning_points?: string[];
  outcomes?: {
    title: string;
    icon: React.ComponentType;
    description: string;
  }[];
  instructor?: {
    name: string;
    role: string;
    company: string;
    image: string;
  };
  category?: string;
};

export type Speaker = {
  avatar: string | undefined;
  id: string;
  name: string;
  occupation: string;
  affiliation: string;
  bio: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
};
