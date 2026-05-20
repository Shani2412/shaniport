export function ProductSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="skeleton w-full h-48" />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 w-20" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-3 w-16" />
        <div className="flex justify-between items-center mt-3">
          <div className="skeleton h-6 w-16" />
          <div className="skeleton h-8 w-16 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-64">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-green-200 border-t-green-600 rounded-full animate-spin" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading fresh products...</p>
      </div>
    </div>
  );
}
