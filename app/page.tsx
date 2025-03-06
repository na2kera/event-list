"use client";

import { Navbar } from "./components/layout/Navbar";
import { Container } from "./components/layout/Container";
import { EventList } from "./components/events/EventList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Container>
        <EventList />
      </Container>
    </div>
  );
}
