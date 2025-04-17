"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log(session);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start items-center h-16 space-x-4">
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
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt="User Avatar"
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {session.user?.name?.[0] || "U"}
                          </span>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-26 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        href="/mypage"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        マイページ
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        ログアウト
                      </button>
                    </div>
                  )}
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
