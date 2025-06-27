import { Event } from "@/types";

export type RecommendedEvent = Event & {
  organization: { name: string; id: string; logo?: string };
  speakers: {
    speaker: {
      id: string;
      name: string;
      occupation: string;
      affiliation: string;
      bio: string;
    };
  }[];
  skills: { id: string; name: string }[];
  categories: {
    category: { id: string; name: string };
  }[];
  isBookmarked?: boolean;
};
