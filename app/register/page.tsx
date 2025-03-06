"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Organization, Event } from "../types";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"organization" | "event">(
    "organization"
  );

  const organizationForm = useForm<Organization>();
  const eventForm = useForm<Event>();

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
            <label className="block mb-2">開始日時 *</label>
            <input
              type="datetime-local"
              {...eventForm.register("startDateTime", { required: true })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">終了日時</label>
            <input
              type="datetime-local"
              {...eventForm.register("endDateTime")}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">場所</label>
            <input
              {...eventForm.register("location")}
              className="w-full p-2 border rounded"
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
              {/* 団体一覧を表示（APIから取得） */}
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
