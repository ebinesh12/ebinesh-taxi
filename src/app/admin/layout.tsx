// app/admin/layout.tsx
import { Sidebar } from "@/components/Sidebar";
// import { ModeToggle } from "@/components/mode-toggle"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex h-14 items-center justify-between border-b px-6">
        <h1 className="text-lg font-semibold">Admin Panel</h1>
        {/* <ModeToggle /> */}
      </header>
      <div className="flex flex-1 flex-row">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
