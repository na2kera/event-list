import { GoalType } from "types/enums";

export interface ProfileData {
  stack: string[];
  tags: string[];
  goals: GoalType[];
}

export async function saveUserProfile(
  userId: string,
  data: ProfileData
): Promise<{ success: boolean }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/users/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          stack: data.stack,
          tag: data.tags,
          goal: data.goals,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save user profile");
    }

    // const result = await response.json();
    return { success: true };
  } catch (error) {
    console.error("Error saving profile:", error);
    throw error;
  }
}
