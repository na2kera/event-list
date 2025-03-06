"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Event List
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">メニューを開く</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isMenuOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isMenuOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <>
                <Link
                  href="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors shadow-sm"
                >
                  イベント登録
                </Link>
                <span className="text-gray-700 font-medium">
                  {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  サインアウト
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors shadow-sm"
              >
                サインイン
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-inner bg-gray-50">
          {session ? (
            <>
              <Link
                href="/register"
                className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors shadow-sm text-center"
              >
                イベント登録
              </Link>
              <div className="px-3 py-2 text-center text-gray-700 font-medium">
                {session.user?.name}
              </div>
              <button
                onClick={() => signOut()}
                className="block w-full text-center text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                サインアウト
              </button>
            </>
          ) : (
            <Link
              href="/auth/signin"
              className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors shadow-sm text-center"
            >
              サインイン
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
