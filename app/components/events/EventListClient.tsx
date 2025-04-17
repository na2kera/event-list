"use client";

import { useState } from "react";
import { Event } from "@/types";
import { EventList } from "./EventList";

interface EventListClientProps {
  events: (Event & {
    organization: { name: string };
    speakers: {
      speaker: { id: string; name: string; occupation: string; affiliation: string; bio: string };
    }[];
    skills: { id: string; name: string }[];
    categories: {
      category: { id: string; name: string };
    }[];
  })[];
}

export function EventListClient({ events }: EventListClientProps) {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchTerm, setSearchTerm] = useState("");

  // 検索機能
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (!term.trim()) {
      setFilteredEvents(events);
      return;
    }
    
    const filtered = events.filter(event => 
      event.title.toLowerCase().includes(term.toLowerCase()) ||
      event.description?.toLowerCase().includes(term.toLowerCase()) ||
      event.organization.name.toLowerCase().includes(term.toLowerCase()) ||
      event.speakers.some(s => s.speaker.name.toLowerCase().includes(term.toLowerCase())) ||
      event.categories.some(c => c.category.name.toLowerCase().includes(term.toLowerCase()))
    );
    
    setFilteredEvents(filtered);
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="イベントを検索..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <EventList events={filteredEvents} />
      
      {filteredEvents.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">検索条件に一致するイベントが見つかりませんでした。</p>
        </div>
      )}
    </div>
  );
}
