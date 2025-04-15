"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { addBookmark, removeBookmark } from "@/lib/api/bookmarkApi";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  eventId: string;
  isBookmarked: boolean;
  className?: string;
}

export function BookmarkButton({
  eventId,
  isBookmarked: initialIsBookmarked,
  className,
}: BookmarkButtonProps) {
  const { data: session } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async () => {
    if (!session?.user?.id) return;

    setIsLoading(true);
    try {
      if (isBookmarked) {
        await removeBookmark(session.user.id, eventId);
        setIsBookmarked(false);
      } else {
        await addBookmark(session.user.id, eventId);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <button
      onClick={handleBookmark}
      disabled={isLoading}
      className={cn(
        "p-2 rounded-full transition-colors",
        isBookmarked
          ? "text-red-500 hover:bg-red-50"
          : "text-gray-400 hover:bg-gray-50",
        className
      )}
    >
      <Heart
        className={cn("w-5 h-5", isBookmarked ? "fill-current" : "fill-none")}
      />
    </button>
  );
}
