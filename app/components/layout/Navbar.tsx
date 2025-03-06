"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export function Navbar() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              Event List
            </Link>
          </div>
          <div className="flex items-center">
            <Link
              href="/register"
              className="mr-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              イベント登録
            </Link>
            <span className="mr-4">{session.user?.name}</span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              サインアウト
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
