export function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">{children}</div>
    </main>
  );
}
