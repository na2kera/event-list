"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Bookmark } from "lucide-react";
import { addBookmark, removeBookmark } from "lib/api/client.ts/bookmarkApi";
import { cn } from "lib/utils";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [isLoading, setIsLoading] = useState(false);

  const handleBookmark = async () => {
    if (!session?.user?.id) {
      // ログインページへリダイレクト
      router.push("/auth/login");
      return;
    }

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

  return (
    <button
      onClick={handleBookmark}
      disabled={isLoading}
      className={cn(
        "p-2 rounded-full transition-colors",
        isBookmarked && session
          ? "text-blue-500 hover:bg-blue-50"
          : "text-gray-400 hover:bg-gray-50",
        className
      )}
      title={
        session ? "ブックマーク" : "ブックマークするにはログインが必要です"
      }
    >
      <Bookmark
        className={cn(
          "w-5 h-5",
          isBookmarked && session ? "fill-current" : "fill-none"
        )}
      />
    </button>
  );
}
