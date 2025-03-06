"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Navbar } from "./components/layout/Navbar";
import { Container } from "./components/layout/Container";
import { EventList } from "./components/events/EventList";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Container>
          <EventList />
        </Container>
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
