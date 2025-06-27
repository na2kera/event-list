export function LoadingState() {
  return (
    <div className="text-center py-16">
      <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-6"></div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">AI分析中</h3>
        <p className="text-gray-600">あなたに最適なイベントを探しています...</p>
      </div>
    </div>
  );
}
