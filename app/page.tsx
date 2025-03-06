"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Event } from "./types";

export default function Home() {
  const { data: session } = useSession();
  const [events, setEvents] = useState<
    (Event & { organization: { name: string } })[]
  >([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  if (session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">Event List</h1>
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
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-bold mb-6">イベント一覧</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {event.organization.name}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(event.startDateTime).toLocaleString("ja-JP")}
                    {event.endDateTime && (
                      <>
                        {" "}
                        〜 {new Date(event.endDateTime).toLocaleString("ja-JP")}
                      </>
                    )}
                  </p>
                  {event.location && (
                    <p className="text-sm text-gray-500 mb-2">
                      場所: {event.location}
                    </p>
                  )}
                  {event.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {event.description}
                    </p>
                  )}
                  {event.detailUrl && (
                    <a
                      href={event.detailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 text-sm"
                    >
                      詳細を見る →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            イベントリストへようこそ
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            アプリケーションを使用するには、サインインしてください。
          </p>
        </div>
        <div className="mt-8 space-y-6">
          <Link
            href="/auth/signin"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            サインイン
          </Link>
        </div>
      </div>
    </div>
  );
}
