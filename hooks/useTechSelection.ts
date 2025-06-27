import { useState, useRef, useEffect } from "react";
import { techCategories, type TechCategory } from "../constants/techCategories";

export interface ModalPosition {
  top: number;
  left: number;
}

export const useTechSelection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTechnologies, setSelectedTechnologies] = useState<string[]>(
    []
  );
  const [modalPosition, setModalPosition] = useState<ModalPosition>({
    top: 0,
    left: 0,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCategorySelect = (
    categoryId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    const modalMaxWidth = 320; // w-80

    // Calculate left position
    let left = buttonRect.right + 16;
    if (left + modalMaxWidth > viewportWidth - 16) {
      left = buttonRect.left - modalMaxWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    // Calculate top position
    let top = buttonRect.top;
    if (top < 16) {
      top = 16;
    }

    setModalPosition({ top, left });
    setSelectedCategory(categoryId);
    setIsModalOpen(true);
  };

  const handleTechnologyToggle = (technology: string) => {
    setSelectedTechnologies((prev) =>
      prev.includes(technology)
        ? prev.filter((t) => t !== technology)
        : [...prev, technology]
    );
  };

  const handleRemoveTechnology = (technology: string) => {
    setSelectedTechnologies((prev) => prev.filter((t) => t !== technology));
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  const getSelectedCategoryData = (): TechCategory | null => {
    if (!selectedCategory) return null;
    return techCategories.find((cat) => cat.id === selectedCategory) || null;
  };

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isModalOpen]);

  // モーダル外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // クリックがモーダル自身か、カテゴリボタンでない場合のみ閉じる
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(
          'button[data-category-button="true"]'
        )
      ) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isModalOpen]);

  return {
    selectedCategory,
    selectedTechnologies,
    modalPosition,
    isModalOpen,
    modalRef,
    handleCategorySelect,
    handleTechnologyToggle,
    handleRemoveTechnology,
    closeModal,
    getSelectedCategoryData,
  };
};
