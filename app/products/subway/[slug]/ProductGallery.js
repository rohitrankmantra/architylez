"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import { BASE_URL } from "@/utils/api";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export default function ProductGallery({ images, title, category }) {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-section").forEach((section) => {
        gsap.from(section, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 80%" },
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const getImageUrl = (path) => {
    if (!path) return "/placeholder.png";
    return path.startsWith("http")
      ? path
      : `${BASE_URL}${path.startsWith("/") ? path : `/uploads/${path}`}`;
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoom((z) => Math.min(Math.max(z + delta, 1), 3));
  };

  const startDrag = (e) => {
    setDragging(true);
    setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const duringDrag = (e) => {
    if (dragging) {
      setOffset({
        x: e.clientX - start.x,
        y: e.clientY - start.y,
      });
    }
  };

  const endDrag = () => setDragging(false);

  return (
    <div ref={containerRef} className="grid grid-cols-2 gap-6 reveal-section">
      {images?.map((img, i) => {
        const fullUrl = getImageUrl(img.url);
        return (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-xl overflow-hidden border border-black/20 shadow-lg cursor-pointer"
            onClick={() => {
              setSelectedImage(fullUrl);
              setZoom(1);
              setOffset({ x: 0, y: 0 });
            }}
          >
            <img
              src={fullUrl}
              alt={`${title} ${i}`}
              className="w-full h-[240px] md:h-[300px] object-cover"
            />
            <div className="absolute left-3 bottom-3 px-3 py-1 rounded-full bg-black/70 text-xs text-white font-medium shadow">
              {category}
            </div>
          </motion.div>
        );
      })}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full flex justify-center items-center"
              onClick={(e) => e.stopPropagation()}
              onWheel={handleWheel}
              onMouseDown={startDrag}
              onMouseMove={duringDrag}
              onMouseUp={endDrag}
              onMouseLeave={endDrag}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black rounded-full p-2"
              >
                <X size={26} />
              </button>

              <motion.img
                src={selectedImage}
                alt="zoom"
                className="rounded-2xl border-4 border-white shadow-2xl object-contain select-none cursor-grab"
                style={{
                  transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
                  transition: dragging ? "none" : "transform 0.2s ease-out",
                  maxWidth: "95vw",
                  maxHeight: "90vh",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
