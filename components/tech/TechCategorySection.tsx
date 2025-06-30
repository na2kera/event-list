import React from "react";
import { techCategories } from "../../constants/techCategories";

interface TechCategorySectionProps {
  isLoading: boolean;
  onCategorySelect: (
    categoryId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function TechCategorySection({
  isLoading,
  onCategorySelect,
}: TechCategorySectionProps) {
  return (
    <div className="flex flex-col space-y-1">
      {techCategories.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            data-category-button="true"
            onClick={(e) => onCategorySelect(item.id, e)}
            disabled={isLoading}
            className="flex items-center w-full text-left p-2 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Icon className="h-5 w-5 mr-3 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{item.name}</span>
          </button>
        );
      })}
    </div>
  );
}
