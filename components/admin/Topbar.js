"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Topbar({ onLogout }) {
  const topbarRef = useRef(null);

  useEffect(() => {
    if (topbarRef.current) {
      gsap.fromTo(
        topbarRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <header
      ref={topbarRef}
      className="h-16 bg-white shadow flex items-center justify-between px-6"
    >
      <h1 className="text-lg font-bold">Admin Dashboard</h1>
      <button
        onClick={onLogout}
        className="text-red-500 font-medium hover:underline"
      >
        Logout
      </button>
    </header>
  );
}
