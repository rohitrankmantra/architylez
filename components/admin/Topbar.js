"use client";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";

export default function Topbar({ toggleSidebar }) {
  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="sticky top-0 z-30 
                 bg-gradient-to-r from-black via-neutral-900 to-black 
                 border-b border-yellow-400/40 
                 shadow-[0_4px_20px_rgba(255,215,0,0.15)] 
                 text-yellow-300 flex items-center justify-between 
                 px-6 py-3"
    >
      {/* Left: Sidebar Toggle */}
      <button
        onClick={toggleSidebar}
        className="p-2 rounded-lg 
                   hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 
                   hover:text-black transition-all duration-300 
                   shadow hover:shadow-[0_0_10px_gold]"
      >
        <Menu size={22} />
      </button>

      {/* Center: Branding */}
      <h1 className="font-bold text-lg tracking-widest text-yellow-400 drop-shadow-md">
        👑 Admin Dashboard
      </h1>

      {/* Right: User Profile */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-9 h-9 rounded-full 
                   bg-gradient-to-tr from-yellow-400 to-yellow-600 
                   text-black flex items-center justify-center font-bold 
                   shadow-lg border-2 border-yellow-300/70"
      >
        A
      </motion.div>
    </motion.header>
  );
}
