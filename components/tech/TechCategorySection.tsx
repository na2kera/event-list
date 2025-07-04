import React, { useState } from "react";
import { tagData } from "../../constants/tagData";
import { techCategories } from "../../constants/techCategories";

interface TechCategorySectionProps {
  isLoading: boolean;
  additionalTagData?: typeof tagData;
  onTagClick?: (tag: string) => void;
  selectedTechnologies: string[];
  onTechnologyToggle: (tag: string) => void;
}

export const TechCategorySection: React.FC<TechCategorySectionProps> = ({
  isLoading,
  additionalTagData,
  onTagClick,
  selectedTechnologies,
  onTechnologyToggle,
}) => {
  // 既存のカテゴリ（例）
  const defaultCategories = [
    "AI・機械学習",
    "Web・モバイル開発",
    "バックエンド・クラウド基盤",
    "ソフトウェア設計・開発プラクティス",
    "ゲーム開発・グラフィックス",
    "セキュリティ・ブロックチェーン",
    "IoT・XR・先進技術",
    "キャリア・マネジメント",
    "コミュニティ・ソフトスキル",
  ];

  // tagDataのカテゴリもマージ
  const categories = additionalTagData
    ? Array.from(
        new Set([...defaultCategories, ...Object.keys(additionalTagData)])
      )
    : defaultCategories;

  // カテゴリ選択状態
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // techCategoriesから該当カテゴリのタグを取得
  const getTechCategoryTags = (category: string) => {
    const found = techCategories.find((cat) => cat.name === category);
    if (found) {
      return found.technologies.map((tech) => ({
        id: tech.id,
        title: tech.name,
        icon: tech.icon,
      }));
    }
    return [];
  };

  // tagDataのタグ一覧取得
  const getTagsForCategory = (category: string) => {
    if (additionalTagData && additionalTagData[category]) {
      return additionalTagData[category];
    }
    return [];
  };

  // カテゴリ選択画面
  if (!selectedCategory) {
    return (
      <div>
        {categories.map((category) => (
          <div key={category} className="mb-2">
            <button
              type="button"
              className="w-full text-left px-3 py-2 rounded hover:bg-indigo-50 transition-colors border border-gray-100 mb-1 font-medium text-gray-700"
              onClick={() => setSelectedCategory(category)}
              disabled={isLoading}
            >
              {category}
            </button>
          </div>
        ))}
      </div>
    );
  }

  // タグ選択画面
  const techTags = getTechCategoryTags(selectedCategory);
  const extraTags = getTagsForCategory(selectedCategory);
  const allTags = [
    ...techTags,
    ...extraTags.filter((tag) => !techTags.some((t) => t.title === tag.title)),
  ];

  return (
    <div>
      <button
        type="button"
        className="mb-3 text-blue-600 hover:underline flex items-center gap-1 text-sm"
        onClick={() => setSelectedCategory(null)}
      >
        <span className="text-lg">←</span> カテゴリー一覧に戻る
      </button>
      <div className="mb-2">
        <span className="font-semibold text-gray-700">{selectedCategory}</span>
      </div>
      {allTags.length > 0 ? (
        <div className="pl-1 max-h-60 overflow-y-auto pr-1">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => {
              const isSelected = selectedTechnologies.includes(tag.title);
              return (
                <button
                  key={tag.id}
                  type="button"
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors whitespace-nowrap
                    ${
                      isSelected
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-200"
                    }`}
                  onClick={() => {
                    onTechnologyToggle(tag.title);
                    if (onTagClick) onTagClick(tag.title);
                  }}
                  disabled={isLoading}
                >
                  {"icon" in tag && tag.icon && (
                    <tag.icon className="h-4 w-4 text-indigo-400" />
                  )}
                  {tag.title}
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-gray-400 text-sm">
          このカテゴリにはタグがありません
        </div>
      )}
    </div>
  );
};
