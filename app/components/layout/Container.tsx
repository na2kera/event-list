export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">{children}</div>
    </main>
  );
}
