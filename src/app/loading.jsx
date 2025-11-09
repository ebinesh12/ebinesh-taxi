"use client";

export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mb-4"></div>
      <p className="text-lg font-semibold text-gray-600 dark:text-white">
        Loading...
      </p>
    </div>
  );
}

{
  /* <div className="fixed top-1/2 text-center z-50">
<Spinner color="info" aria-label="Center-aligned spinner example" size="xl" />
</div> */
}
