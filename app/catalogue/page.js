"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import api from "@/utils/api";


// === Catalogue Page ===
export default function Catalogue() {
  const containerRef = useRef(null);
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "GVT", "Subway", "Wall", "Wood"];

  // GSAP hero animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".catalogue-grid", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.5,
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Fetch catalogues from API
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

  // Filter catalogues by active category
  const filteredCatalogues =
    activeCategory === "All"
      ? catalogues
      : catalogues.filter((c) => c.category === activeCategory);

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
              Browse our comprehensive digital catalogues featuring the latest
              collections, technical specifications, and design inspirations.
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
              className="text-center mb-8"
            >
              <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
                <span className="text-outline">Featured</span>{" "}
                <span className="text-black">Catalogues</span>
              </h2>
              <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
                Download or browse our digital catalogues online. Each catalogue
                includes detailed specifications, installation guides, and
                design inspiration.
              </p>

              {/* Categories Tabs below heading */}
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {["All", "GVT", "Subway", "Wall", "Wood"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full font-semibold transition-colors duration-300 ${
                      activeCategory === cat
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {loading ? (
              <p className="text-center text-gray-500">Loading catalogues...</p>
            ) : filteredCatalogues.length === 0 ? (
              <p className="text-center text-gray-500">
                No catalogues found in this category.
              </p>
            ) : (
              <div className="catalogue-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredCatalogues.map((catalogue, index) => (
                  <CatalogueCard
                    key={catalogue._id}
                    catalogue={catalogue}
                    index={index}
                  />
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

// === Catalogue Card ===
function CatalogueCard({ catalogue, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500"
    >
      {/* Thumbnail */}
      <div className="relative h-64 overflow-hidden bg-gray-100 flex items-center justify-center">
        {catalogue.thumbnail?.url ? (
          <img
            src={catalogue.thumbnail.url}
            alt={catalogue.title || "Catalogue thumbnail"}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400">No thumbnail</span>
        )}
        {/* Category Tag */}
        {catalogue.category && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
            {catalogue.category}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-6 space-y-3">
        <h3 className="font-space text-xl font-semibold text-black">
          {catalogue.title}
        </h3>
        <div className="font-machina text-gray-500 text-xs font-medium uppercase tracking-wide">
          {catalogue.subtitle || ""}
        </div>
        <p className="font-inter text-gray-600 text-sm leading-relaxed line-clamp-3">
          {catalogue.description}
        </p>

        <div className="flex space-x-3 pt-3">
          <motion.a
            href={catalogue.pdf?.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2.5 bg-black text-white font-machina font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-300 text-center text-sm"
          >
            Download
          </motion.a>
          <motion.a
            href={catalogue.pdf?.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-2.5 border-2 border-black text-black font-machina font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300 text-center text-sm"
          >
            View
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}
