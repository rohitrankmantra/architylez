 "use client";
import { Menu } from "lucide-react";

export default function Topbar({ toggleSidebar }) {
  return (
    <header className="sticky top-0 z-30 bg-black border-b border-yellow-500 text-yellow-500 flex items-center justify-between px-4 py-3 shadow-md">
      {/* Left: Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
      >
        <Menu size={22} />
      </button>

      {/* Center: Branding */}
      <h1 className="font-semibold text-lg tracking-wide">Admin Dashboard</h1>

      {/* Right: User Info (can add profile later) */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  );
}
