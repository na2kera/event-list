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
  startDateTime: Date;
  endDateTime?: Date;
  location?: string;
  detailUrl?: string;
  organizationId: string;
};
