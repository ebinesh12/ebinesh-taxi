import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100 dark:bg-gray-900">
      <h1 className="text-5xl font-bold text-red-500 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl text-gray-700 dark:text-gray-300 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-500 mb-6">
        Sorry, the page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Go Home
      </Link>
    </div>
  );
}
