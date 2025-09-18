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
      {/* Inner orb (always visible) */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full z-[9999] pointer-events-none"
        style={{
          background: hover
            ? "radial-gradient(circle at center, rgba(100,149,237,0.9), rgba(30,30,60,0.8))"
            : "black", // fallback solid black like before
        }}
        animate={{
          x: pos.x - 12,
          y: pos.y - 12,
          scale: hover ? 1.6 : 1,
          boxShadow: hover
            ? "0 0 25px rgba(100,149,237,0.8)"
            : "0 0 12px rgba(100,149,237,0.5)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Outer ring with blend effect */}
      <motion.div
        className="fixed top-0 left-0 w-14 h-14 rounded-full z-[9998] pointer-events-none mix-blend-difference"
        style={{ border: "2px solid rgba(100,149,237,0.6)" }}
        animate={{
          x: pos.x - 28,
          y: pos.y - 28,
          scale: hover ? 1.3 : 1,
          opacity: hover ? 0.8 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />

      {/* Pulse effect */}
      {hover && (
        <motion.div
          className="fixed top-0 left-0 w-20 h-20 rounded-full z-[9997] pointer-events-none"
          style={{ backgroundColor: "rgba(100,149,237,0.25)" }}
          animate={{
            x: pos.x - 40,
            y: pos.y - 40,
            scale: [1, 2],
            opacity: [0.3, 0],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      )}
    </>
  );
}
