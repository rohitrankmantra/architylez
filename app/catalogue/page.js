"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import api from "@/utils/api";
import { useInView } from "react-intersection-observer";

// PDF thumbnail generator
async function getPdfThumbnail(pdfUrl) {
  if (!pdfUrl || typeof window === "undefined") return null;

  try {
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf");
    pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.12.313/pdf.worker.min.js";

    const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext("2d");
    await page.render({ canvasContext: context, viewport }).promise;

    return canvas.toDataURL();
  } catch (err) {
    console.error("Thumbnail generation failed:", err);
    return null;
  }
}

export default function Catalogue() {
  const containerRef = useRef(null);
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);

  // GSAP hero animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", { y: 80, opacity: 0, duration: 1.2, ease: "power3.out" });
      gsap.from(".catalogue-grid", { y: 40, opacity: 0, duration: 1, ease: "power2.out", delay: 0.5 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Fetch catalogues
  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const response = await api.get("/catalogues");
        setCatalogues(response.data);
      } catch (err) {
        console.error("Failed to fetch catalogues:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogues();
  }, []);

  return (
    <Loader>
      <Navigation />
      <div ref={containerRef} className="bg-white text-black">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
          <div className="hero-content max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-clash text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-black">Digital</span>{" "}
              <span className="text-outline">Catalogue</span>
            </h1>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Browse our comprehensive digital catalogues featuring the latest collections, technical specifications, and design inspirations.
            </p>
          </div>
        </section>

        {/* Catalogues Grid */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
                <span className="text-outline">Featured</span>{" "}
                <span className="text-black">Catalogues</span>
              </h2>
              <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
                Download or browse our digital catalogues online. Each catalogue includes detailed specifications, installation guides, and design inspiration.
              </p>
            </motion.div>

            {loading ? (
              <p className="text-center text-gray-500">Loading catalogues...</p>
            ) : (
              <div className="catalogue-grid grid grid-cols-1 md:grid-cols-2 gap-10">
                {catalogues.map((catalogue, index) => (
                  <CatalogueCard key={catalogue._id} catalogue={catalogue} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </Loader>
  );
}

// CatalogueCard with PDF first page as thumbnail
function CatalogueCard({ catalogue, index }) {
  const [thumbnail, setThumbnail] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: "200px" });

  useEffect(() => {
    const loadThumbnail = async () => {
      if (!catalogue.pdf?.url) return;

      const cacheKey = `thumb-${catalogue._id}`;
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        setThumbnail(cached);
        return;
      }

      try {
        const thumb = await getPdfThumbnail(catalogue.pdf.url);
        if (thumb) {
          setThumbnail(thumb);
          localStorage.setItem(cacheKey, thumb);
        }
      } catch (err) {
        console.error("Thumbnail generation failed for", catalogue.pdf.url);
      }
    };

    if (inView) loadThumbnail();
  }, [inView, catalogue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500"
    >
      <div className="relative h-80 overflow-hidden bg-gray-100 flex items-center justify-center">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={catalogue.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400">Loading thumbnail...</span>
        )}
      </div>

      <div className="p-8 space-y-4">
        <h3 className="font-space text-2xl font-semibold text-black mb-2">
          {catalogue.title}
        </h3>
        <div className="font-machina text-gray-500 text-sm font-medium uppercase tracking-wide">
          {catalogue.subtitle || ""}
        </div>
        <p className="font-inter text-gray-600 leading-relaxed">
          {catalogue.description}
        </p>

        <div className="flex space-x-4 pt-4">
          <motion.a
            href={catalogue.pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-black text-white font-machina font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-300 text-center"
          >
            Download PDF
          </motion.a>
          <motion.a
            href={catalogue.pdf.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 border-2 border-black text-black font-machina font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300 text-center"
          >
            View Online
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
