"use client";

import { Navbar } from "./components/layout/Navbar";
import { Container } from "./components/layout/Container";
import { EventList } from "./components/events/EventList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <Container>
        <div className="py-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            イベント一覧
          </h1>
          <EventList />
        </div>
      </Container>
    </div>
  );
}
