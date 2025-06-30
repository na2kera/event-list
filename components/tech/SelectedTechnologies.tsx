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
      <div className="p-4 rounded-xl bg-white/10 border border-white/20">
        <div className="flex flex-wrap justify-center gap-3">
          {selectedTechnologies.map((tech) => (
            <div
              key={tech}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-600 text-white"
            >
              <span>{tech}</span>
              <button
                onClick={() => onRemoveTechnology(tech)}
                className="p-0.5 rounded-full hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 flex w-full justify-center">
          <button
            onClick={onSearchWithSelected}
            className="flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors"
          >
            <Search className="h-4 w-4 mr-3" />
            <span>選択した技術で検索</span>
          </button>
        </div>
      </div>
    </div>
  );
}
