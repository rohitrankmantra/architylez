"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "@/components/ui/Loader";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FiFilter } from "react-icons/fi"; // Filter icon

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GvtTiles() {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const data = [
      { id: "elegant-marble-finish", title: "Elegant Marble Finish", image: "https://picsum.photos/600/400?random=1", size: "600x600 mm", category: "GVT" },
      { id: "textured-stone-look", title: "Textured Stone Look", image: "https://picsum.photos/600/400?random=2", size: "800x800 mm", category: "GVT" },
      { id: "glossy-white-tile", title: "Glossy White Tile", image: "https://picsum.photos/600/400?random=3", size: "600x1200 mm", category: "GVT" },
      { id: "premium-black-tile", title: "Premium Black Tile", image: "https://picsum.photos/600/400?random=4", size: "800x1200 mm", category: "GVT" },
    ];
    setProducts(data);
    setFilteredProducts(data);
  }, []);

  // Run filtering only when clicking the button
  const handleFilterClick = () => {
    const filtered = products.filter((p) => {
      const allFields = [p.title, p.size, p.category].join(" ").toLowerCase();
      return allFields.includes(searchText.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

  return (
    <Loader>
      <Navigation />
      <div ref={containerRef} className="relative bg-white text-black">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 text-center text-white px-6 max-w-4xl">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="font-clash text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Premium</span>{" "}
              <span className="text-outline text-white">GVT Tiles</span>
            </motion.h1>
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-lg md:text-xl text-gray-200"
            >
              Explore our finest collection of glazed vitrified tiles, blending
              strength with modern elegance.
            </motion.p>
          </div>
        </section>

        {/* Product Showcase */}
        <section className="reveal-section py-24 px-6 bg-white text-black">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-6"
            >
              <h2 className="font-clash text-4xl md:text-6xl font-bold mb-3">
                <span className="text-black">Our</span>{" "}
                <span className="text-outline">Collections</span>
              </h2>
              <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
                Discover premium GVT tile collections designed for durability,
                elegance, and timeless appeal.
              </p>
            </motion.div>

            {/* Search + Filter Button */}
<div className="flex justify-center mb-12">
  <div className="relative w-full max-w-7xl">
    <input
      type="text"
      placeholder="Search by name, size, category..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleFilterClick();
      }}
      className="w-full p-5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black pr-32 text-lg"
      style={{ height: "60px" }}
    />
    <button
      onClick={handleFilterClick}
      className="absolute right-0 top-0 h-full bg-black text-white px-6 rounded-r-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
    >
      <FiFilter size={22} />
      Filter
    </button>
  </div>
</div>



            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, i) => (
                <Link key={i} href={`/products/gvt/${product.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="group relative rounded-2xl overflow-hidden shadow-lg bg-black cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-300" />
                    <div className="absolute top-4 left-4 bg-white text-black px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      {product.category}
                    </div>
                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="font-space text-xl font-semibold">
                        {product.title}
                      </h3>
                      <p className="text-gray-300 text-sm">{product.size}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </Loader>
  );
}
