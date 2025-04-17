"use client";

import React from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center h-16 space-x-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Event List
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex">
            <Link
              href="/events"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              イベント一覧
            </Link>
            {/* <Link
              href="/events/search"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              イベント検索
            </Link> */}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center ml-auto">
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors shadow-sm"
                >
                  イベント登録
                </Link>
                <div className="relative group">
                  <button
                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                    onClick={() => signOut()}
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      <User className="h-5 w-5 text-indigo-600" />
                    </div>
                    <span className="hidden md:inline text-sm font-medium">
                      {session.user?.name}
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors shadow-sm"
              >
                ログイン
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
