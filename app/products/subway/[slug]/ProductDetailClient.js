// ProductDetailClient.jsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ---------- Lucide-style inline icons ---------- */
const IconWrapper = ({ children }) => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-yellow-400 drop-shadow-[0_0_6px_rgba(255,215,0,0.7)]"
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
function CorridorIcon() {
  return (
    <IconWrapper>
      {"<path d='M4 4h16v16H4z' /><path d='M10 4v16' /><path d='M14 4v16' />"}
    </IconWrapper>
  );
}
function MallIcon() {
  return (
    <IconWrapper>
      {"<path d='M3 21h18' /><path d='M8 21V9h8v12' /><path d='M6 9h12l-2-4H8l-2 4z' />"}
    </IconWrapper>
  );
}
function SpaIcon() {
  return (
    <IconWrapper>
      {"<circle cx='12' cy='12' r='4' /><path d='M12 2v2' /><path d='M12 20v2' /><path d='M2 12h2' /><path d='M20 12h2' />"}
    </IconWrapper>
  );
}
function ReligiousIcon() {
  return (
    <IconWrapper>
      {"<path d='M12 2v20' /><path d='M6 12h12' /><path d='M4 22h16v-6l-8-4-8 4v6z' />"}
    </IconWrapper>
  );
}


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
    <>
     <div className="min-h-screen bg-gradient-to-b from-black via-[#0b0b0b] to-black text-white">
      {/* Hero Section with product.thumbnail */}
      {product.thumbnail && (
        <div className="relative w-full h-[60vh] md:h-[100vh] ">
          <img
            src={product.thumbnail}
            alt={`${product.title} hero`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            {/* <h1 className="text-5xl md:text-7xl font-clash text-yellow-400 drop-shadow-[0_0_25px_rgba(255,215,0,0.7)] text-center px-4">
              {product.title}
            </h1> */}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="px-6 md:px-20 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* LEFT: Thumbnails in 2-column grid */}
       <div className="grid grid-cols-2 gap-6">
  {images.map((img, i) => (
    <motion.div
      key={i}
      whileHover={{ scale: 1.04 }}
      className="relative rounded-xl overflow-hidden border-2 border-yellow-500/20 shadow-[0_0_25px_rgba(255,215,0,0.25)] cursor-pointer transition-all"
      onClick={() => setSelectedImage(img)}
    >
      <img
        src={img}
        alt={`${product.title} ${i}`}
        className="w-full h-[220px] md:h-[280px] object-cover"
      />
      <div className="absolute left-3 bottom-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-sm text-yellow-300 font-semibold">
        {product.title}
      </div>
    </motion.div>
  ))}
</div>

        {/* RIGHT: Product info */}
        <div className="flex flex-col">
          <h2 className="text-lg text-gray-300 mb-4">Product Details</h2>
          <h2 className="text-2xl text-yellow-300 mb-8">{product.title}</h2>
          

          <div className="rounded-2xl overflow-hidden border border-yellow-500/20 bg-gradient-to-r from-black/60 to-black/40 mb-10 shadow-lg">
            <div className="grid grid-cols-2 gap-6 p-8">
              <div className="text-sm text-yellow-300 font-semibold">Category</div>
              <div className="text-sm text-gray-200">{product.category}</div>

              <div className="text-sm text-yellow-300 font-semibold">Size</div>
              <div className="text-sm text-gray-200">{product.size}</div>

              <div className="text-sm text-yellow-300 font-semibold">Finish</div>
              <div className="text-sm text-gray-200">{product.finish ?? "-"}</div>

              <div className="text-sm text-yellow-300 font-semibold">Series</div>
              <div className="text-sm text-gray-200">{product.series ?? "-"}</div>
            </div>
          </div>

          {/* Applications */}
          <div className="mb-12">
            <h3 className="text-2xl text-yellow-300 font-semibold mb-6">Applications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {usageOptions.map((u, idx) => {
                const Icon = u.Icon;
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center text-center gap-4 p-6 rounded-xl bg-black/40 border border-yellow-500/20 hover:scale-110 transition-transform shadow-md hover:shadow-yellow-500/30"
                  >
                    <div className="w-14 h-14 flex items-center justify-center">
                      <Icon />
                    </div>
                    <div className="text-sm text-gray-200 font-medium">{u.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Similar Products */}
          {product.similar?.length > 0 && (
            <div className="mt-auto">
              <h4 className="text-yellow-300 font-semibold mb-4">Similar Products</h4>
              <div className="flex gap-6 flex-wrap">
                {product.similar.map((s, i) => (
                  <div
                    key={i}
                    className="w-32 cursor-pointer hover:scale-105 transition-transform"
                  >
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-24 object-cover rounded-lg border border-yellow-500/20 shadow-md"
                    />
                    <div className="text-xs text-gray-200 mt-2 text-center">{s.title}</div>
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
              className="max-w-[90%] max-h-[90%] rounded-2xl border-4 border-yellow-500/40 shadow-[0_0_40px_rgba(255,215,0,0.3)]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
   
  );
}
