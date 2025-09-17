"use client";
import { motion } from "framer-motion";
import { LayoutDashboard, Package, FolderKanban, LogOut } from "lucide-react";
import Link from "next/link";

export default function Sidebar({ isOpen }) {
  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed left-0 top-0 h-screen w-60 bg-black border-r border-yellow-500 text-yellow-500 shadow-lg z-40"
    >
      <div className="p-5 font-bold text-xl tracking-wide border-b border-yellow-500">
        Admin Panel
      </div>

      <nav className="flex flex-col mt-5 space-y-3 px-3">
        <Link
          href="/admin"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
        >
          <LayoutDashboard size={20} /> Dashboard
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
        >
          <Package size={20} /> Products
        </Link>
        <Link
          href="/admin/catalogues"
          className="flex items-center gap-2 p-2 rounded-lg hover:bg-yellow-500 hover:text-black transition"
        >
          <FolderKanban size={20} /> Catalogues
        </Link>
        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-red-600 hover:text-white transition">
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </motion.aside>
  );
}
