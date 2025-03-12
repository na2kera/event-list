export type Organization = {
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
};
