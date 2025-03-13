"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Organization, Event, Speaker, Category } from "../types";

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"organization" | "event">(
    "organization"
  );
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSpeakers, setSelectedSpeakers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [speakersRes, categoriesRes] = await Promise.all([
          fetch("/api/speakers"),
          fetch("/api/categories"),
        ]);

        if (!speakersRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [speakersData, categoriesData] = await Promise.all([
          speakersRes.json(),
          categoriesRes.json(),
        ]);

        setSpeakers(speakersData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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

  const handleAddSkill = () => {
    if (newSkill.trim() && !selectedSkills.includes(newSkill.trim())) {
      setSelectedSkills([...selectedSkills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const onEventSubmit = async (data: Event) => {
    try {
      const eventData = {
        ...data,
        skills: selectedSkills.map((name) => ({ name })),
        speakers: selectedSpeakers.map((speakerId) => ({ speakerId })),
        categories: selectedCategories.map((categoryId) => ({ categoryId })),
      };

      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) throw new Error("Failed to create event");
      eventForm.reset();
      setSelectedSkills([]);
      setSelectedSpeakers([]);
      setSelectedCategories([]);
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
          <div>
            <label className="block mb-2">学べること</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="新しいスキルを入力"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                追加
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill) => (
                <span
                  key={skill}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block mb-2">登壇者 *</label>
            <select
              multiple
              value={selectedSpeakers}
              onChange={(e) =>
                setSelectedSpeakers(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="w-full p-2 border rounded"
            >
              {speakers.map((speaker) => (
                <option key={speaker.id} value={speaker.id}>
                  {speaker.name} ({speaker.affiliation})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2">カテゴリ *</label>
            <select
              multiple
              value={selectedCategories}
              onChange={(e) =>
                setSelectedCategories(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              className="w-full p-2 border rounded"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
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
