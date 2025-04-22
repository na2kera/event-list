export interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  lineId: string | null;
  stack: string[];
  level: string | null;
  place: string | null;
  tag: string[];
  goal: string[];
  affiliation: string | null;
}

export interface UpdateUserProfileData {
  name?: string;
  email?: string;
  image?: string;
  stack?: string[];
  level?: string;
  place?: string;
  tag?: string[];
  goal?: string[];
  affiliation?: string;
}

export async function getUserProfile(userId: string): Promise<UserProfile> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user profile");
  }

  const data = await response.json();
  return data.user;
}

export async function updateUserProfile(
  userId: string,
  data: UpdateUserProfileData
): Promise<UserProfile> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }

  const result = await response.json();
  return result.user;
}
