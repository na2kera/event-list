import { BookOpen } from "lucide-react";

interface ColumnCardProps {
  column: {
    id: number;
    title: string;
    excerpt: string;
  };
}

export function ColumnCard({ column }: ColumnCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
      <BookOpen className="h-8 w-8 text-indigo-600 mb-4" />
      <h3 className="text-lg font-bold text-gray-900 mb-2">{column.title}</h3>
      <p className="text-gray-600 mb-4">{column.excerpt}</p>
      <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
        続きを読む →
      </button>
    </div>
  );
}
