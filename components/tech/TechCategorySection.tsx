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
    <div className="mt-8">
      <h3 className="text-white text-lg font-semibold mb-4 text-center">
        技術分野から選択
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {techCategories.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              data-category-button="true"
              onClick={(e) => onCategorySelect(item.id, e)}
              disabled={isLoading}
              className="group p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex items-center space-x-3">
                <div className="rounded-full w-10 h-10 flex items-center justify-center bg-indigo-500/20 group-hover:bg-indigo-500/30 transition-colors">
                  <Icon className="h-5 w-5 text-indigo-300" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-medium text-sm group-hover:text-indigo-200 transition-colors">
                    {item.name}
                  </h4>
                  <p className="text-indigo-200 text-xs">{item.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
