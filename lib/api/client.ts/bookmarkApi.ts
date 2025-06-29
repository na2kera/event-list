import { Bookmark } from "@/types";

export const addBookmark = async (
  userId: string,
  eventId: string
): Promise<Bookmark> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/bookmarks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, eventId }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add bookmark");
  }

  return response.json();
};

export const removeBookmark = async (
  userId: string,
  eventId: string
): Promise<void> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/bookmarks/${userId}/${eventId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to remove bookmark");
  }
};

export const getUserBookmarks = async (userId: string): Promise<Bookmark[]> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_INTERNAL_API_URL}/bookmarks/user/${userId}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch bookmarks");
  }

  const data: Bookmark[] = await response.json();
  return data;
};
