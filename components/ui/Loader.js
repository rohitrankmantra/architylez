"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Auto-hide loader after 1.8s
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 flex flex-col items-center justify-center bg-primary-dark text-primary-gold z-[9999]"
          >
            {/* Pulsing Circle */}
            <motion.div
              className="w-24 h-24 rounded-full border-4 border-primary-gold mb-8"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.6, 1],
                boxShadow: [
                  "0 0 20px rgba(255,215,0,0.7)",
                  "0 0 40px rgba(255,215,0,1)",
                  "0 0 20px rgba(255,215,0,0.7)",
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut",
              }}
            />

            {/* Website Name */}
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="font-clash text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-500 bg-clip-text text-transparent"
            >
              Architylezz
            </motion.h1>

            {/* Sliding Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-white/70 mt-4 tracking-wide"
            >
              Luxury Interiors & Innovation
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Website Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
