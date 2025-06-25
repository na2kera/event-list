import React from "react";
import { X, Check } from "lucide-react";
import type { TechCategory } from "../../constants/techCategories";
import type { ModalPosition } from "../../hooks/useTechSelection";

interface TechSelectionModalProps {
  isOpen: boolean;
  position: ModalPosition;
  categoryData: TechCategory | null;
  selectedTechnologies: string[];
  modalRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onTechnologyToggle: (technology: string) => void;
}

export function TechSelectionModal({
  isOpen,
  position,
  categoryData,
  selectedTechnologies,
  modalRef,
  onClose,
  onTechnologyToggle,
}: TechSelectionModalProps) {
  if (!isOpen || !categoryData) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* オーバーレイ */}
      <div
        className="fixed inset-0 bg-black/30 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* モーダルコンテンツ */}
      <div
        ref={modalRef}
        className="absolute bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-auto max-w-lg"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          transform: "translateZ(0)",
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="rounded-full w-8 h-8 flex items-center justify-center bg-indigo-100">
              <categoryData.icon className="h-4 w-4 text-indigo-600" />
            </div>
            <h3
              id="modal-title"
              className="text-lg font-semibold text-gray-900"
            >
              {categoryData.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto -mr-2 pr-2">
          <div className="flex flex-wrap gap-2">
            {categoryData.technologies.map((tech) => {
              const isSelected = selectedTechnologies.includes(tech.name);
              return (
                <button
                  key={tech.id}
                  onClick={() => onTechnologyToggle(tech.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    isSelected
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-indigo-100 hover:text-indigo-700 hover:border-indigo-200"
                  }`}
                >
                  {isSelected && <Check className="h-4 w-4" />}
                  {tech.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            複数選択可能。選択後、モーダルを閉じてください。
          </p>
        </div>
      </div>
    </div>
  );
}
