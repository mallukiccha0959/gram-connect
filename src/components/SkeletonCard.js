export default function SkeletonCard() {
  return (
    <div className="animate-pulse bg-white rounded-3xl shadow-lg p-4">

      <div className="bg-gray-300 h-40 rounded-2xl" />

      <div className="mt-4 h-6 bg-gray-300 rounded w-3/4" />

      <div className="mt-3 h-4 bg-gray-300 rounded w-1/2" />

      <div className="mt-5 h-10 bg-gray-300 rounded-xl" />

    </div>
  );
}