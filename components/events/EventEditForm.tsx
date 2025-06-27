"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Event, Speaker, Category, GoalType } from "@/types";
import { updateEvent } from "lib/api/server.ts/serverApi";

interface EventEditFormProps {
  eventId: string;
  initialEventData: Event & {
    organization: { name: string };
    speakers: {
      speaker: Speaker;
    }[];
    skills: { name: string }[];
    categories: {
      category: Category;
    }[];
    goals?: { goalType: GoalType }[];
  };
  categories: Category[];
  speakers: Speaker[];
}

export function EventEditForm({
  eventId,
  initialEventData,
  categories: availableCategories,
  speakers: availableSpeakers,
}: EventEditFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // フォームの状態を管理
  const [formData, setFormData] = useState({
    title: initialEventData.title || "",
    description: initialEventData.description || "",
    eventDate: formatDateForInput(initialEventData.eventDate),
    startTime: initialEventData.startTime || "",
    endTime: initialEventData.endTime || "",
    venue: initialEventData.venue || "",
    address: initialEventData.address || "",
    location: initialEventData.location || "",
    detailUrl: initialEventData.detailUrl || "",
    image: initialEventData.image || "",
    organizationId: initialEventData.organizationId || "",
    format: initialEventData.format || "OFFLINE",
    difficulty: initialEventData.difficulty || "FOR_EVERYONE",
    price: initialEventData.price?.toString() || "0",
    eventType: initialEventData.eventType || "WORKSHOP",
  });

  // スキル、カテゴリ、スピーカーの状態管理
  const [skills, setSkills] = useState(
    initialEventData.skills?.map((skill) => skill.name) || []
  );
  const [newSkill, setNewSkill] = useState("");

  const [categories, setCategories] = useState(
    initialEventData.categories?.map((cat) => ({
      categoryId: cat.category.id,
      name: cat.category.name,
    })) || []
  );
  const [newCategoryId, setNewCategoryId] = useState("");

  const [speakers, setSpeakers] = useState(
    initialEventData.speakers?.map((spk) => ({
      speakerId: spk.speaker.id,
      name: spk.speaker.name,
    })) || []
  );
  const [newSpeakerId, setNewSpeakerId] = useState("");

  // ゴールの状態管理
  const [goals, setGoals] = useState<GoalType[]>(
    initialEventData.goals?.map((goal) => goal.goalType) || []
  );

  // 入力変更ハンドラ
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // スキル追加ハンドラ
  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  // スキル削除ハンドラ
  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  // カテゴリ追加ハンドラ
  const handleAddCategory = () => {
    if (
      newCategoryId &&
      !categories.some((cat) => cat.categoryId === newCategoryId)
    ) {
      // 選択されたカテゴリのデータを取得
      const selectedCategory = availableCategories.find(
        (cat) => cat.id === newCategoryId
      );

      if (selectedCategory) {
        setCategories([
          ...categories,
          { categoryId: newCategoryId, name: selectedCategory.name },
        ]);
        setNewCategoryId("");
      }
    }
  };

  // カテゴリ削除ハンドラ
  const handleRemoveCategory = (categoryIdToRemove: string) => {
    setCategories(
      categories.filter((cat) => cat.categoryId !== categoryIdToRemove)
    );
  };

  // スピーカー追加ハンドラ
  const handleAddSpeaker = () => {
    if (
      newSpeakerId &&
      !speakers.some((spk) => spk.speakerId === newSpeakerId)
    ) {
      // 選択されたスピーカーのデータを取得
      const selectedSpeaker = availableSpeakers.find(
        (spk) => spk.id === newSpeakerId
      );

      if (selectedSpeaker) {
        setSpeakers([
          ...speakers,
          { speakerId: newSpeakerId, name: selectedSpeaker.name },
        ]);
        setNewSpeakerId("");
      }
    }
  };

  // スピーカー削除ハンドラ
  const handleRemoveSpeaker = (speakerIdToRemove: string) => {
    setSpeakers(speakers.filter((spk) => spk.speakerId !== speakerIdToRemove));
  };

  // ゴール追加/削除ハンドラ
  const handleToggleGoal = (goalType: GoalType) => {
    setGoals((prev) =>
      prev.includes(goalType)
        ? prev.filter((g) => g !== goalType)
        : [...prev, goalType]
    );
  };

  // フォーム送信ハンドラ
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // APIに送信するデータを準備
      const eventData = {
        ...formData,
        price: parseInt(formData.price, 10),
        skills: skills.map((name) => ({ name })),
        categories: categories.map((cat) => ({ categoryId: cat.categoryId })),
        speakers: speakers.map((spk) => ({ speakerId: spk.speakerId })),
        goals: goals.map((goalType) => ({ goalType })),
      };

      // イベント更新APIを呼び出し
      await updateEvent(eventId, eventData);

      setSuccessMessage("イベントが正常に更新されました");

      // 成功したら詳細ページにリダイレクト（少し待ってから）
      setTimeout(() => {
        router.push(`/events/${eventId}`);
        router.refresh(); // キャッシュを更新
      }, 1500);
    } catch (error) {
      console.error("Error updating event:", error);
      setErrorMessage("イベントの更新中にエラーが発生しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 基本情報セクション */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">基本情報</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                イベントタイトル *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                開催日 *
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                開始時間 *
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                終了時間
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              説明
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* 開催情報セクション */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">開催情報</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                会場名 *
              </label>
              <input
                type="text"
                name="venue"
                value={formData.venue}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                住所
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                開催形式
              </label>
              <select
                name="format"
                value={formData.format}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="OFFLINE">オフライン</option>
                <option value="ONLINE">オンライン</option>
                <option value="HYBRID">ハイブリッド</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                イベントタイプ
              </label>
              <select
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="WORKSHOP">ワークショップ</option>
                <option value="HACKATHON">ハッカソン</option>
                <option value="CONTEST">コンテスト</option>
                <option value="LIGHTNING_TALK">LT会</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                難易度
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="FOR_EVERYONE">全ての人向け</option>
                <option value="BEGINNER">初心者向け</option>
                <option value="INTERMEDIATE">中級者向け</option>
                <option value="ADVANCED">上級者向け</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                参加費
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* スキルセクション */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">
            身につけられるスキル
          </h2>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="スキル名を入力"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              追加
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gray-100 px-3 py-1 rounded-full flex items-center"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* カテゴリセクション */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">カテゴリ</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              カテゴリを選択
            </label>
            <div className="flex items-center space-x-2">
              <select
                value={newCategoryId}
                onChange={(e) => setNewCategoryId(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">カテゴリを選択してください</option>
                {availableCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddCategory}
                disabled={!newCategoryId}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !newCategoryId ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                追加
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-indigo-100 px-3 py-1 rounded-full flex items-center"
              >
                <span>{category.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCategory(category.categoryId)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* スピーカーセクション */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">スピーカー</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              スピーカーを選択
            </label>
            <div className="flex items-center space-x-2">
              <select
                value={newSpeakerId}
                onChange={(e) => setNewSpeakerId(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">スピーカーを選択してください</option>
                {availableSpeakers.map((speaker) => (
                  <option key={speaker.id} value={speaker.id}>
                    {speaker.name} ({speaker.affiliation})
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddSpeaker}
                disabled={!newSpeakerId}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  !newSpeakerId ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                追加
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="bg-green-100 px-3 py-1 rounded-full flex items-center"
              >
                <span>{speaker.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSpeaker(speaker.speakerId)}
                  className="ml-2 text-gray-500 hover:text-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ゴールセクション */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold border-b pb-2">ゴール</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { type: "IMPROVE_SKILLS", label: "スキル向上" },
              { type: "EXPERIENCE_TEAM_DEV", label: "チーム開発経験" },
              { type: "CREATE_PORTFOLIO", label: "ポートフォリオ作成" },
            ].map(({ type, label }) => (
              <button
                key={type}
                type="button"
                onClick={() => handleToggleGoal(type as GoalType)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  goals.includes(type as GoalType)
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 送信ボタン */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            キャンセル
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "更新中..." : "更新する"}
          </button>
        </div>
      </form>
    </div>
  );
}

// 日付をフォームのdate入力用にフォーマットする関数
function formatDateForInput(dateString: string | Date): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  // 無効な日付の場合は空文字を返す
  if (isNaN(date.getTime())) return "";

  // YYYY-MM-DD形式に変換
  return date.toISOString().split("T")[0];
}
