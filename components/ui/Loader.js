"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
            className="fixed inset-0 flex flex-col items-center justify-center bg-white text-black z-[9999]"
          >
            {/* Logo Image */}
            <motion.img
              src="/loader.png" // Replace with your logo path
              alt="Logo"
              className="w-24 h-24 mb-8 object-contain"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1],
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
              className="font-clash text-5xl md:text-7xl font-normal bg-gradient-to-r from-black via-gray-600 to-black bg-clip-text text-transparent uppercase"
            >
              Architylezz
            </motion.h1>

            {/* Sliding Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg md:text-xl text-gray-700 mt-4 tracking-wide"
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
