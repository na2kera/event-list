import { AlertCircle } from "lucide-react";

interface ErrorDisplayProps {
  error: string;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-2">
        <AlertCircle className="h-6 w-6 text-red-600" />
        <span className="font-semibold text-red-900">エラーが発生しました</span>
      </div>
      <p className="text-red-700">{error}</p>
    </div>
  );
}
