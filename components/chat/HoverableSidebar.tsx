import React, { useState } from "react";
import { TechCategorySection } from "../tech/TechCategorySection";
import { SelectedTechnologies } from "../tech/SelectedTechnologies";
import { Settings, ChevronRight } from "lucide-react";

interface HoverableSidebarProps {
  selectedTechnologies: string[];
  isLoading: boolean;
  onCategorySelect: (
    categoryId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onRemoveTechnology: (technology: string) => void;
  onSearchWithSelected: () => void;
}

export function HoverableSidebar({
  selectedTechnologies,
  isLoading,
  onCategorySelect,
  onRemoveTechnology,
  onSearchWithSelected,
}: HoverableSidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isManuallyCollapsed, setIsManuallyCollapsed] = useState(false);

  // モバイル判定
  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // 技術選択の変化を監視
  const [prevTechCount, setPrevTechCount] = useState(0);

  React.useEffect(() => {
    // 新しい技術が追加された場合は手動閉じフラグをリセット
    if (selectedTechnologies.length > prevTechCount && prevTechCount >= 0) {
      setIsManuallyCollapsed(false);
    }
    setPrevTechCount(selectedTechnologies.length);
  }, [selectedTechnologies.length, prevTechCount]);

  // 技術選択がある場合は自動的に展開、削除された場合は収縮
  React.useEffect(() => {
    if (selectedTechnologies.length > 0 && !isManuallyCollapsed) {
      setIsExpanded(true);
    } else if (selectedTechnologies.length === 0) {
      setIsExpanded(false);
      setIsManuallyCollapsed(false); // 技術が全て削除されたらフラグをリセット
    }
  }, [selectedTechnologies.length, isManuallyCollapsed]);

  return (
    <div className="relative h-full">
      {/* 細いサイドバー（デフォルト状態） */}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-gray-50 border-r border-gray-200 transition-all duration-300 z-40 
          ${isExpanded ? (isMobile ? "w-64" : "w-80") : "w-16"}`}
        onMouseEnter={() =>
          !isMobile &&
          (selectedTechnologies.length === 0 || isManuallyCollapsed) &&
          setIsExpanded(true)
        }
        onMouseLeave={() =>
          !isMobile &&
          (selectedTechnologies.length === 0 || isManuallyCollapsed) &&
          setIsExpanded(false)
        }
        onClick={() => isMobile && setIsExpanded(!isExpanded)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            if (isMobile) setIsExpanded(!isExpanded);
          }
        }}
        aria-label={isExpanded ? "サイドバーを閉じる" : "サイドバーを開く"}
      >
        {/* 細い状態のアイコン表示 */}
        <div className={`${isExpanded ? "hidden" : "block"} p-4`}>
          <div className="flex flex-col items-center space-y-4">
            <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
              <Settings className="h-6 w-6" />
            </div>
            <div className="text-xs text-center text-gray-600 transform rotate-90 whitespace-nowrap">
              技術選択
            </div>
            {selectedTechnologies.length > 0 && (
              <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
            )}
          </div>
        </div>

        {/* 展開状態のコンテンツ */}
        <div
          className={`${
            isExpanded ? "block" : "hidden"
          } p-4 h-full flex flex-col`}
        >
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">技術選択</h2>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </div>

          {/* 技術カテゴリーセクション */}
          <div className="pb-4 border-b border-gray-200">
            <TechCategorySection
              isLoading={isLoading}
              onCategorySelect={onCategorySelect}
            />
          </div>

          {/* 選択済み技術セクション */}
          <div className="pt-4 flex-grow">
            <h3 className="text-sm font-semibold mb-2 text-gray-600">
              選択中の技術
            </h3>
            <SelectedTechnologies
              selectedTechnologies={selectedTechnologies}
              onRemoveTechnology={onRemoveTechnology}
              onSearchWithSelected={onSearchWithSelected}
            />
          </div>
        </div>
      </div>

      {/* オーバーレイ（展開時にクリックで閉じる） */}
      {isExpanded && (
        <div
          className="fixed inset-0 top-16 bg-transparent z-30"
          onClick={() => {
            setIsExpanded(false);
            if (selectedTechnologies.length > 0) {
              setIsManuallyCollapsed(true); // 技術選択がある状態で手動で閉じた場合
            }
          }}
        />
      )}
    </div>
  );
}
