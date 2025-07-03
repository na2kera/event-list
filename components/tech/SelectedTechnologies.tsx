import React from "react";
import { Search, X } from "lucide-react";

interface SelectedTechnologiesProps {
  selectedTechnologies: string[];
  onRemoveTechnology: (technology: string) => void;
  onSearchWithSelected: () => void;
}

export function SelectedTechnologies({
  selectedTechnologies,
  onRemoveTechnology,
  onSearchWithSelected,
}: SelectedTechnologiesProps) {
  if (selectedTechnologies.length === 0) {
    return null;
  }

  return (
    <div className="mt-2">
      <div className="p-3 rounded-lg bg-white border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-2">
          {selectedTechnologies.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              <span>{tech}</span>
              <button
                onClick={() => onRemoveTechnology(tech)}
                className="p-0.5 rounded-full hover:bg-indigo-200 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-3 flex w-full">
          <button
            onClick={onSearchWithSelected}
            className="flex items-center justify-center px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors w-full"
          >
            <Search className="h-4 w-4 mr-2" />
            <span>検索</span>
          </button>
        </div>
      </div>
    </div>
  );
}
