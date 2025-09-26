"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------- Icons ---------- */
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

// Sample products
const products = [
  {
    id: "elegant-marble-finish",
    title: "Elegant Marble Finish",
    description: "Premium marble look GVT tile for modern interiors.",
    thumbnail: "https://picsum.photos/1200/800?random=10",
    images: [
      "https://picsum.photos/1200/800?random=11",
      "https://picsum.photos/1200/800?random=12",
      "https://picsum.photos/1200/800?random=13",
    ],
    size: "600x600 mm",
    category: "GVT",
    finish: "Glossy",
    series: "Luxury",
  },
  {
    id: "textured-stone-look",
    title: "Textured Stone Look",
    description: "Durable stone-like finish ideal for flooring.",
    thumbnail: "https://picsum.photos/1200/800?random=20",
    images: [
      "https://picsum.photos/1200/800?random=21",
      "https://picsum.photos/1200/800?random=22",
    ],
    size: "800x800 mm",
    category: "GVT",
    finish: "Rustic Matt",
  },
  {
    id: "glossy-white-tile",
    title: "Glossy White Tile",
    description: "Bright glossy surface for elegant spaces.",
    thumbnail: "https://picsum.photos/1200/800?random=30",
    images: [
      "https://picsum.photos/1200/800?random=31",
      "https://picsum.photos/1200/800?random=32",
    ],
    size: "600x1200 mm",
    category: "GVT",
    finish: "High Gloss",
  },
];

export default function ProductDetailPage({ params }) {
  const containerRef = useRef(null);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Simulate fetching product from params.slug
  useEffect(() => {
    const slug = params?.slug || "elegant-marble-finish";
    const found = products.find((p) => p.id === slug);
    setProduct(found);
  }, [params]);

  // GSAP animation
  useEffect(() => {
    if (!product) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".reveal-section").forEach((section) => {
        gsap.from(section, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [product]);

  if (!product) return <div className="p-10 text-center">Loading...</div>;

  const images = product.images ?? [product.thumbnail];

  return (
    <>
      <Navigation />
      <div ref={containerRef} className="min-h-screen bg-white text-black">
        {/* Hero */}
        <div className="relative w-full h-[60vh] md:h-[85vh]">
          <img
            src={product.thumbnail}
            alt={product.title}
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

        {/* Content */}
        <div className="px-6 md:px-20 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start reveal-section">
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
                  className="w-full h-[220px] md:h-[260px] object-cover hover:grayscale-0 transition-all"
                />
                <div className="absolute left-3 bottom-3 px-3 py-1 rounded-full bg-black/70 text-xs text-white font-medium shadow">
                  {product.title}
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT: Info */}
          <div>
            <h2 className="text-3xl font-bold mb-6">{product.title}</h2>

            {/* Specification */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold mb-6">Specification</h3>
              <div className="rounded-2xl overflow-hidden border border-black/20 bg-white shadow-md">
                <div className="grid grid-cols-2 gap-6 p-6 text-sm text-gray-700">
                  <div className="font-medium">Category</div>
                  <div>{product.category}</div>

                  <div className="font-medium">Size</div>
                  <div>{product.size}</div>

                  <div className="font-medium">Finish</div>
                  <div>{product.finish ?? "-"}</div>

                  <div className="font-medium">Series</div>
                  <div>{product.series ?? "-"}</div>
                </div>
              </div>
            </section>

            {/* Applications */}
            <section className="mb-12">
              <h3 className="text-xl font-semibold mb-6">Applications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {usageOptions.map((u, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center justify-center gap-2 p-4 border border-black/20 rounded-lg shadow hover:shadow-lg transition text-center text-sm"
                  >
                    <u.Icon />
                    <span>{u.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="text-xl font-semibold mb-4">Description</h3>
              <p className="text-base leading-relaxed text-gray-800">
                {product.description ??
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </p>
            </section>
          </div>
        </div>

        {/* Similar Products
        <section className="py-24 px-6 reveal-section">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center">
              You may also like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products
                .filter((p) => p.id !== product.id)
                .map((p, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="group relative rounded-2xl overflow-hidden shadow-lg bg-black cursor-pointer"
                  >
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-300" />
                    <div className="absolute top-4 left-4 bg-white text-black px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      {p.category}
                    </div>
                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="font-space text-xl font-semibold">{p.title}</h3>
                      <p className="text-gray-300 text-sm">{p.size}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section> */}
      </div>
      <Footer />

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
    </>
  );
}
