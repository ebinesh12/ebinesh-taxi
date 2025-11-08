// components/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, List, Car } from "lucide-react";
import Logout  from "./Logout";

const navItems = [
  { href: "/admin", icon: Home, label: "Dashboard" },
  { href: "/admin/bookings", icon: List, label: "Bookings" },
  { href: "/admin/vehicles", icon: Car, label: "Vehicles" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium ${
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "hover:bg-accent"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        ))}
        <Logout />
      </nav>
    </aside>
  );
}
