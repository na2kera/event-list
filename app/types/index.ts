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
  image?: string;
  spots?: number;
  organizationId: string;
  organization?: Organization;
  skills: Array<{ name: string }>;
  speakers: Array<Speaker>;
  categories: Array<Category>;
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
