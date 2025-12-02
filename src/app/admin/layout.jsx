import { Sidebar } from "@/components/Sidebar";
// import { ModeToggle } from "@/components/mode-toggle"
import { cn } from "@/lib/utils";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <div className=" min-h-screen">
        <header className="flex h-14 items-center justify-between border-b px-6">
          <h1 className="text-lg font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-500 to-indigo-700">
            ADMIN PANEL
          </h1>
        </header>
        <div
          className={cn(
            "relative min-h-screen w-full p-0 overflow-hidden transition-colors duration-300",
            "bg-gradient-to-br from-blue-100 via-white to-cyan-100 dark:from-blue-950 dark:via-gray-900 dark:to-black",
          )}
        >
          <div className="flex flex-row">
            <Sidebar />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
