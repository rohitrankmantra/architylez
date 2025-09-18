"use client";
import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import toast, { Toaster } from "react-hot-toast";
import Loader from "@/components/ui/Loader"

export default function AdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // 🔑 Credentials (replace with backend auth later)
  const ADMIN_EMAIL = "admin@site.com";
  const ADMIN_PASS = "12345";

  const handleLogin = (e) => {
    e.preventDefault();

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
        toast.success("Welcome back, Admin!");
        setIsAuthenticated(true);
      } else {
        toast.error("Invalid email or password!");
      }
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-black text-yellow-500">
      <Toaster position="top-right" />

      {/* 🔒 Overlay Login */}
      {!isAuthenticated ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          <div className="w-full max-w-md bg-black/70 border border-yellow-500/30 rounded-2xl shadow-[0_0_25px_rgba(255,215,0,0.4)] p-8">
            <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8 tracking-wide">
              Admin Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-yellow-500/30 text-yellow-100 placeholder-yellow-200/50 focus:ring-2 focus:ring-yellow-400 outline-none"
              />
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-black/50 border border-yellow-500/30 text-yellow-100 placeholder-yellow-200/50 focus:ring-2 focus:ring-yellow-400 outline-none"
              />

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 px-4 py-3 rounded-lg bg-yellow-400 text-black font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-70"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      ) : (
        <>
        <Loader/>
          {/* Sidebar */}
          <Sidebar isOpen={isSidebarOpen} />

          {/* Main Content Area */}
          <div className="flex flex-col flex-1">
            {/* Topbar */}
            <Topbar toggleSidebar={toggleSidebar} />

            {/* Page Content */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </>
      )}
    </div>
  );
}
