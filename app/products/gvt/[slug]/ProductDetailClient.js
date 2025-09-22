"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Lucide-style inline icons ---------- */
const IconWrapper = ({ children, className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`text-black ${className}`}
    aria-hidden="true"
    dangerouslySetInnerHTML={{ __html: children }}
  />
);

function HomeIcon() { return <IconWrapper>{"<path d='M3 11.5L12 4l9 7.5' /><path d='M9 21V12h6v9' />"}</IconWrapper>; }
function BuildingIcon() { return <IconWrapper>{"<rect x='3' y='3' width='18' height='18' rx='2' /><path d='M8 7v6' /><path d='M12 7v6' /><path d='M16 7v6' />"}</IconWrapper>; }
function CafeIcon() { return <IconWrapper>{"<path d='M3 8h14v4a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V8z' /><path d='M8 3v2' /><path d='M12 3v2' /><path d='M18 11h1a2 2 0 1 0 0-4h-1' />"}</IconWrapper>; }
function DumbbellIcon() { return <IconWrapper>{"<path d='M2 12h2' /><path d='M20 12h2' /><path d='M7 12h10' /><rect x='1' y='9' width='3' height='6' rx='1' /><rect x='20' y='9' width='3' height='6' rx='1' />"}</IconWrapper>; }
function HospitalIcon() { return <IconWrapper>{"<path d='M3 21h18' /><path d='M12 3v6' /><path d='M9 8h6' /><rect x='6' y='9' width='12' height='11' rx='2' />"}</IconWrapper>; }
function PlaneIcon() { return <IconWrapper>{"<path d='M2 12l20-7-7 7 7 7L2 12z' />"}</IconWrapper>; }
function SchoolIcon() { return <IconWrapper>{"<path d='M12 2l10 6-10 6-10-6 10-6z' /><path d='M2 20h20' /><path d='M6 12v8' /><path d='M18 12v8' />"}</IconWrapper>; }
function FactoryIcon() { return <IconWrapper>{"<path d='M3 21h18' /><path d='M3 12h4v9' /><path d='M11 12v9' /><path d='M15 12v9' /><path d='M7 12v-4l4-3 4 3v4' />"}</IconWrapper>; }
function CorridorIcon() { return <IconWrapper>{"<path d='M4 4h16v16H4z' /><path d='M10 4v16' /><path d='M14 4v16' />"}</IconWrapper>; }
function MallIcon() { return <IconWrapper>{"<path d='M3 21h18' /><path d='M8 21V9h8v12' /><path d='M6 9h12l-2-4H8l-2 4z' />"}</IconWrapper>; }
function SpaIcon() { return <IconWrapper>{"<circle cx='12' cy='12' r='4' /><path d='M12 2v2' /><path d='M12 20v2' /><path d='M2 12h2' /><path d='M20 12h2' />"}</IconWrapper>; }
function ReligiousIcon() { return <IconWrapper>{"<path d='M12 2v20' /><path d='M6 12h12' /><path d='M4 22h16v-6l-8-4-8 4v6z' />"}</IconWrapper>; }

const usageOptions = [
  { label: "Residential", Icon: HomeIcon },
  { label: "Commercial Building", Icon: BuildingIcon },
  { label: "Hotel, Restaurant & Cafe", Icon: CafeIcon },
  { label: "Gymnasium", Icon: DumbbellIcon },
  { label: "Hospital", Icon: HospitalIcon },
  { label: "Airport", Icon: PlaneIcon },
  { label: "School & College", Icon: SchoolIcon },
  { label: "Industry", Icon: FactoryIcon },
  { label: "Hall & Corridor", Icon: CorridorIcon },
  { label: "Mall & Super Market", Icon: MallIcon },
  { label: "Spa and Wellness Centres", Icon: SpaIcon },
  { label: "Religious Place", Icon: ReligiousIcon },
];

export default function ProductDetailClient({ product }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const images = product?.images ?? [product.image];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero */}
      {product.thumbnail && (
        <div className="relative w-full h-[60vh] md:h-[85vh]">
          <img
            src={product.thumbnail}
            alt={`${product.title} hero`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 flex items-center justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-white text-4xl md:text-6xl font-bold tracking-wide text-center"
            >
              {product.title}
            </motion.h1>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="px-6 md:px-20 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* LEFT: Images */}
        <div className="grid grid-cols-2 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-xl overflow-hidden border border-black/20 shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`${product.title} ${i}`}
                className="w-full h-[220px] md:h-[260px] object-cover  hover:grayscale-0 transition-all"
              />
              <div className="absolute left-3 bottom-3 px-3 py-1 rounded-full bg-black/70 text-xs text-white font-medium shadow">
                {product.title}
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: Info */}
        <div>
          <h2 className="text-lg text-gray-500 mb-3">Product Details</h2>
          <h2 className="text-3xl font-bold mb-8">{product.title}</h2>

          <div className="rounded-2xl overflow-hidden border border-black/20 bg-white shadow-md mb-10">
            <div className="grid grid-cols-2 gap-6 p-8">
              <div className="text-sm font-medium text-gray-600">Category</div>
              <div className="text-sm">{product.category}</div>

              <div className="text-sm font-medium text-gray-600">Size</div>
              <div className="text-sm">{product.size}</div>

              <div className="text-sm font-medium text-gray-600">Finish</div>
              <div className="text-sm">{product.finish ?? "-"}</div>

              <div className="text-sm font-medium text-gray-600">Series</div>
              <div className="text-sm">{product.series ?? "-"}</div>
            </div>
          </div>

          {/* Applications */}
          <section className="py-16">
            <motion.h3
              className="text-3xl md:text-4xl font-bold mb-14  text-black"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Applications :
            </motion.h3>

            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              {usageOptions.map((u, idx) => (
                <motion.div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-3 p-6 border border-black/20 rounded-xl bg-white shadow hover:shadow-lg transition"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  <u.Icon />
                  <div className="text-sm font-medium text-center">{u.label}</div>
                </motion.div>
              ))}
            </motion.div>

           
          </section>

          {/* Similar Products */}
          {product.similar?.length > 0 && (
            <div className="mt-12">
              <h4 className="font-semibold mb-4">Similar Products</h4>
              <div className="flex gap-6 flex-wrap">
                {product.similar.map((s, i) => (
                  <div
                    key={i}
                    className="w-32 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-24 object-cover rounded-lg border border-black/20 shadow-sm"
                    />
                    <div className="text-xs text-gray-800 mt-2 text-center">
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
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
