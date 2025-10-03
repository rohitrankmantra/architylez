"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ProductGallery({ images, title, category }) {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-section").forEach(section => {
        gsap.from(section, { y: 80, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%" } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-6 reveal-section">
      {images?.map((img, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.03 }}
          className="relative rounded-xl overflow-hidden border border-black/20 shadow-lg cursor-pointer"
          onClick={() => setSelectedImage(img.url)}
        >
          <img src={img.url} alt={`${title} ${i}`} className="w-full h-[220px] md:h-[260px] object-cover" />
          <div className="absolute left-3 bottom-3 px-3 py-1 rounded-full bg-black/70 text-xs text-white font-medium shadow">
            {category}
          </div>
        </motion.div>
      ))}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.img
              src={selectedImage}
              alt="zoom"
              className="max-w-[90%] max-h-[90%] rounded-2xl border-4 border-white shadow-lg"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
