import { Event, Organization, Speaker, Category } from "@/app/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
}

// API Endpoints
export const api = {
  // Organizations
  getOrganizations: () => fetchApi<Organization[]>("/organizations"),
  createOrganization: (
    data: Omit<Organization, "id" | "createdAt" | "updatedAt">
  ) =>
    fetchApi<Organization>("/organizations", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Events
  getEvents: () =>
    fetchApi<(Event & { organization: Organization })[]>("/events"),
  getEvent: (id: string) =>
    fetchApi<
      Event & {
        organization: Organization;
        speakers: { speaker: Speaker }[];
        categories: { category: Category }[];
      }
    >(`/events/${id}`),
  createEvent: (data: Omit<Event, "id" | "createdAt" | "updatedAt">) =>
    fetchApi<Event>("/events", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Speakers
  getSpeakers: () => fetchApi<Speaker[]>("/speakers"),
  createSpeaker: (data: Omit<Speaker, "id" | "createdAt" | "updatedAt">) =>
    fetchApi<Speaker>("/speakers", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Categories
  getCategories: () => fetchApi<Category[]>("/categories"),
  createCategory: (data: Omit<Category, "id" | "createdAt" | "updatedAt">) =>
    fetchApi<Category>("/categories", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
