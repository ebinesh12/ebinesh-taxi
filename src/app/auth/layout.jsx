"use client";

import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminLayout({ children }) {

  return (
    <>
      <Header />

      <div
        className={cn(
          "relative min-h-screen p-6 md:p-10 overflow-hidden transition-colors duration-300",
          "bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black",
          "flex justify-center items-center",
        )}
      >
        {/* Floating gradient effects with blue glow */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Blob */}
          <div
            className={cn(
              "absolute top-0 right-0 w-[350px] h-[350px] opacity-20 rounded-full blur-3xl animate-pulse",
               "bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400 dark:from-blue-500 dark:via-indigo-600 dark:to-cyan-500",
            )}
          ></div>
          {/* Right Blob */}
          <div
            className="absolute bottom-0 left-0 w-[350px] h-[350px]
                                bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-400
                                dark:from-indigo-500 dark:via-blue-600 dark:to-cyan-500
                                opacity-20 rounded-full blur-3xl animate-pulse"
          ></div>
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
}
