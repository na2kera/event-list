export type Organization = {
  logo: string | undefined;
  id: string;
  name: string;
  description?: string;
  website?: string;
  email?: string;
};

export type Difficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type EventFormat = "ONLINE" | "OFFLINE" | "HYBRID";

export type EventType = "HACKATHON" | "WORKSHOP" | "CONTEST" | "LIGHTNING_TALK";

export type GoalType =
  | "IMPROVE_SKILLS"
  | "EXPERIENCE_TEAM_DEV"
  | "CREATE_PORTFOLIO";

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

export interface Event {
  id: string;
  title: string;
  description?: string;
  eventDate: string;
  startTime: string;
  endTime?: string;
  venue: string;
  address?: string;
  location?: string;
  detailUrl?: string;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
  image?: string;
  format: EventFormat;
  difficulty: Difficulty;
  price: number;
  eventType: EventType;
  organization?: Organization;
  skills?: { id: string; name: string }[];
  categories?: { category: Category }[];
  speakers?: { speaker: Speaker }[];
  goals?: { goalType: GoalType }[];
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
}

export interface Bookmark {
  id: string;
  userId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
  Event: Event;
}
