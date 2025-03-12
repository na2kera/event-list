"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Organization, Event } from "../types";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"organization" | "event">(
    "organization"
  );
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const organizationForm = useForm<Organization>();
  const eventForm = useForm<Event>();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("/api/organizations");
        if (!response.ok) throw new Error("Failed to fetch organizations");
        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const onOrganizationSubmit = async (data: Organization) => {
    try {
      const response = await fetch("/api/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create organization");
      organizationForm.reset();
      alert("団体を登録しました");
    } catch (error) {
      console.error("Error creating organization:", error);
      alert("エラーが発生しました");
    }
  };

  const onEventSubmit = async (data: Event) => {
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create event");
      eventForm.reset();
      alert("イベントを登録しました");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("エラーが発生しました");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === "organization"
              ? "bg-blue-500 text-white"
              : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("organization")}
        >
          団体登録
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "event" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("event")}
        >
          イベント登録
        </button>
      </div>

      {activeTab === "organization" ? (
        <form
          onSubmit={organizationForm.handleSubmit(onOrganizationSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2">団体名 *</label>
            <input
              {...organizationForm.register("name", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">説明</label>
            <textarea
              {...organizationForm.register("description")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">ウェブサイト</label>
            <input
              type="url"
              {...organizationForm.register("website")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">メールアドレス</label>
            <input
              type="email"
              {...organizationForm.register("email")}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            登録
          </button>
        </form>
      ) : (
        <form
          onSubmit={eventForm.handleSubmit(onEventSubmit)}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2">イベント名 *</label>
            <input
              {...eventForm.register("title", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">説明</label>
            <textarea
              {...eventForm.register("description")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">開催日 *</label>
            <input
              type="date"
              {...eventForm.register("eventDate", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">開始時間 *</label>
            <input
              type="time"
              {...eventForm.register("startTime", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">終了時間</label>
            <input
              type="time"
              {...eventForm.register("endTime")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">開催場所 *</label>
            <input
              {...eventForm.register("venue", { required: true })}
              className="w-full p-2 border rounded"
              placeholder="建物や施設名"
            />
          </div>
          <div>
            <label className="block mb-2">住所</label>
            <input
              {...eventForm.register("address")}
              className="w-full p-2 border rounded"
              placeholder="〒000-0000 都道府県市区町村..."
            />
          </div>
          <div>
            <label className="block mb-2">会場の詳細情報</label>
            <input
              {...eventForm.register("location")}
              className="w-full p-2 border rounded"
              placeholder="〇階 会議室A など"
            />
          </div>
          <div>
            <label className="block mb-2">詳細URL</label>
            <input
              type="url"
              {...eventForm.register("detailUrl")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">主催団体 *</label>
            <select
              {...eventForm.register("organizationId", { required: true })}
              className="w-full p-2 border rounded"
            >
              <option value="">選択してください</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            登録
          </button>
        </form>
      )}
    </div>
  );
}
