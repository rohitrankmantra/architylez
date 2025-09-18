"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Catalogue() {
  const containerRef = useRef(null);
  const [selectedCatalogue, setSelectedCatalogue] = useState(0);

  const catalogues = [
    {
      id: 1,
      title: "GVT Collection 2024",
      subtitle: "Premium Glazed Vitrified Tiles",
      pages: 48,
      size: "12.5 MB",
      image:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Explore our latest collection of premium glazed vitrified tiles featuring marble-inspired designs, contemporary patterns, and innovative finishes.",
    },
    {
      id: 2,
      title: "Wall Tiles Showcase",
      subtitle: "Designer Wall Solutions",
      pages: 36,
      size: "8.2 MB",
      image:
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Discover stunning wall tile designs perfect for kitchens, bathrooms, and feature walls. From subway classics to modern geometric patterns.",
    },
    {
      id: 3,
      title: "Wood Collection",
      subtitle: "Natural Wood-Look Tiles",
      pages: 32,
      size: "10.1 MB",
      image:
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Experience the warmth of natural wood with the durability of ceramic. Featuring oak, walnut, pine, and exotic wood textures.",
    },
    {
      id: 4,
      title: "Subway & Metro",
      subtitle: "Classic Subway Tiles",
      pages: 24,
      size: "6.8 MB",
      image:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Timeless subway tiles in various sizes and finishes. Perfect for creating classic, contemporary, or industrial-style interiors.",
    },
  ];

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
              collections, technical specifications, and design inspirations for
              your next project.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              {[
                { value: "500+", label: "Products" },
                { value: "12", label: "Collections" },
                { value: "4K", label: "HD Images" },
                { value: "24/7", label: "Access" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-clash text-3xl font-bold text-black mb-1">
                    {stat.value}
                  </div>
                  <div className="font-space text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
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
                Download or browse our digital catalogues online. Each catalogue
                includes detailed specifications, installation guides, and
                design inspiration.
              </p>
            </motion.div>

            <div className="catalogue-grid grid grid-cols-1 md:grid-cols-2 gap-10">
              {catalogues.map((catalogue, index) => (
                <motion.div
                  key={catalogue.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500"
                >
                  {/* Catalogue Preview */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={catalogue.image}
                      alt={catalogue.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute bottom-4 left-4 flex space-x-3">
                      <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-machina">
                        {catalogue.pages} pages
                      </div>
                      <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-machina">
                        {catalogue.size}
                      </div>
                    </div>
                  </div>

                  {/* Catalogue Info */}
                  <div className="p-8 space-y-4">
                    <h3 className="font-space text-2xl font-semibold text-black mb-2">
                      {catalogue.title}
                    </h3>
                    <div className="font-machina text-gray-500 text-sm font-medium uppercase tracking-wide">
                      {catalogue.subtitle}
                    </div>
                    <p className="font-inter text-gray-600 leading-relaxed">
                      {catalogue.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 bg-black text-white font-machina font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-300"
                      >
                        Download PDF
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-3 border-2 border-black text-black font-machina font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300"
                      >
                        View Online
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-clash text-4xl md:text-5xl font-bold mb-6">
                <span className="text-black">Stay</span>{" "}
                <span className="text-outline">Updated</span>
              </h2>
              <p className="font-inter text-gray-600 text-lg mb-8">
                Subscribe to receive the latest catalogues and product updates
                directly in your inbox.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-white border border-gray-300 text-black rounded-full focus:border-black focus:outline-none transition-colors duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-black text-white font-machina font-semibold rounded-full hover:bg-gray-900 transition-colors duration-300"
                >
                  Subscribe
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </Loader>
  );
}
