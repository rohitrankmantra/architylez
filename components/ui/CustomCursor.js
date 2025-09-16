"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });

    const addHover = () => setHover(true);
    const removeHover = () => setHover(false);

    window.addEventListener("mousemove", move);
    document.querySelectorAll("button, a").forEach((el) => {
      el.addEventListener("mouseenter", addHover);
      el.addEventListener("mouseleave", removeHover);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("button, a").forEach((el) => {
        el.removeEventListener("mouseenter", addHover);
        el.removeEventListener("mouseleave", removeHover);
      });
    };
  }, []);

  return (
    <>
      {/* Inner orb */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-yellow-400 z-[9999] pointer-events-none"
        animate={{
          x: pos.x - 10,
          y: pos.y - 10,
          scale: hover ? 1.6 : 1,
          boxShadow: hover
            ? "0 0 25px rgba(255,215,0,1), 0 0 50px rgba(255,215,0,0.8)"
            : "0 0 15px rgba(255,215,0,0.7)"
        }}
        transition={{ type: "spring", stiffness: 600, damping: 28 }}
      />

      {/* Outer trailing neon ring */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border-2 border-yellow-400 z-[9998] pointer-events-none"
        animate={{
          x: pos.x - 24,
          y: pos.y - 24,
          scale: hover ? 1.4 : 1,
          opacity: hover ? 0.9 : 0.5,
          boxShadow: hover
            ? "0 0 30px rgba(255,215,0,0.8)"
            : "0 0 15px rgba(255,215,0,0.5)"
        }}
        transition={{ type: "spring", stiffness: 180, damping: 25 }}
      />

      {/* Pulse effect */}
      {hover && (
        <motion.div
          className="fixed top-0 left-0 w-16 h-16 rounded-full bg-yellow-400 z-[9997] pointer-events-none opacity-30"
          animate={{
            x: pos.x - 32,
            y: pos.y - 32,
            scale: [1, 2],
            opacity: [0.3, 0],
          }}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      )}
    </>
  );
}
