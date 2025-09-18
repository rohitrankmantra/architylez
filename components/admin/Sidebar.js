"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, FolderKanban, LogOut } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";

export default function Sidebar({ isOpen }) {
  const sidebarRef = useRef(null);

  // 🎬 GSAP animation for Sidebar slide
  useEffect(() => {
    if (sidebarRef.current) {
      if (isOpen) {
        gsap.to(sidebarRef.current, {
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        });
      } else {
        gsap.to(sidebarRef.current, {
          x: -250,
          duration: 0.6,
          ease: "power3.in",
        });
      }
    }
  }, [isOpen]);

  return (
    <aside
      ref={sidebarRef}
      className="fixed left-0 top-0 h-screen w-60 
                 bg-gradient-to-b from-black via-neutral-900 to-black 
                 border-r border-yellow-400/40 text-yellow-300 
                 shadow-[4px_0_20px_rgba(255,215,0,0.2)] z-40"
      style={{ transform: "translateX(0)" }}
    >
      {/* Logo / Brand */}
      <div className="p-5 font-extrabold text-xl tracking-widest 
                      border-b border-yellow-400/30 
                      bg-gradient-to-r from-yellow-500/20 to-transparent 
                      text-yellow-400 shadow-inner">
        👑 Admin Panel
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col mt-6 space-y-3 px-4">
        <Link
          href="/admin"
          className="flex items-center gap-3 p-3 rounded-lg 
                     hover:bg-gradient-to-r hover:from-yellow-400/90 hover:to-yellow-600 
                     hover:text-black transition-all duration-300 
                     shadow hover:shadow-[0_0_12px_gold]"
        >
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center gap-3 p-3 rounded-lg 
                     hover:bg-gradient-to-r hover:from-yellow-400/90 hover:to-yellow-600 
                     hover:text-black transition-all duration-300 
                     shadow hover:shadow-[0_0_12px_gold]"
        >
          <Package size={20} /> Products
        </Link>
        <Link
          href="/admin/catalogues"
          className="flex items-center gap-3 p-3 rounded-lg 
                     hover:bg-gradient-to-r hover:from-yellow-400/90 hover:to-yellow-600 
                     hover:text-black transition-all duration-300 
                     shadow hover:shadow-[0_0_12px_gold]"
        >
          <FolderKanban size={20} /> Catalogues
        </Link>

        {/* Logout */}
        <button
          className="flex items-center gap-3 p-3 rounded-lg mt-6 
                     hover:bg-red-600 hover:text-white transition-all duration-300 
                     shadow hover:shadow-[0_0_10px_red]"
        >
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </aside>
  );
}
