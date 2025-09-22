"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dashboardRef = useRef(null);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === "admin@site.com" && password === "12345") {
      setIsAuthenticated(true);
      toast.success("Welcome Admin")
    } else {
      toast.error("Invalid Credentials")
    }
  };

  useEffect(() => {
    if (isAuthenticated && dashboardRef.current) {
      gsap.fromTo(
        dashboardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [isAuthenticated]);

  return (
    <>
    
      {/* Overlay Login */}
      <AnimatePresence>
        {!isAuthenticated && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm"
            >
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
                Admin Login
              </h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-500"
                  />
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-gray-900 placeholder-gray-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-black"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition"
                >
                  Login
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard */}
      {isAuthenticated && (
        <div ref={dashboardRef} className="h-screen flex bg-white">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Topbar onLogout={() => setIsAuthenticated(false)} />
            <main className="flex-1 overflow-y-auto p-6 text-gray-900">
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
}
