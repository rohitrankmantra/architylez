"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { FiFilter } from "react-icons/fi";
import api,{BASE_URL} from "@/utils/api"; 
import { useRouter } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GvtTiles() {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  // Fetch all products and filter for GVT category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        const gvtProducts = res.data.filter(
          (p) => p.category?.toLowerCase() === "gvt"
        );
        setProducts(gvtProducts);
        setFilteredProducts(gvtProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Run filtering only when clicking the button
  const handleFilterClick = () => {
    const filtered = products.filter((p) => {
      const allFields = [p.title, p.size, p.category].join(" ").toLowerCase();
      return allFields.includes(searchText.toLowerCase());
    });
    setFilteredProducts(filtered);
  };

 // Helper to build image URL
const getImageUrl = (product) => {
  const imagePath = product.thumbnail?.url || product.image;
  if (!imagePath) return "/placeholder.png";
  return imagePath.startsWith("http")
    ? imagePath
    : `${BASE_URL.replace(/^http:/, 'https:')}${imagePath.startsWith("/") ? imagePath : `/uploads/${imagePath}`}`;
};

  return (
    <Loader>
      <Navigation />
      <div ref={containerRef} className="relative bg-white text-black">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('/bg/gvt.jpg')` }}
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
              Explore our finest collection of glazed vitrified tiles,
              blending strength with modern elegance.
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

            {/* Search + Filter */}
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

            {/* Products Grid */}
            {loading ? (
              <p className="text-center text-gray-500">Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center text-gray-400 text-lg">
                No products found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product._id}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="group relative rounded-2xl overflow-hidden shadow-lg bg-black cursor-pointer"
                    onClick={() => router.push(`/products/gvt/${product._id}`)}
                  >
                    <img
                      src={getImageUrl(product)}
                      alt={product.title}
                      onError={(e) => (e.target.src = "/placeholder.png")}
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
                      <p className="text-gray-300 text-sm">
                        {Array.isArray(product.size)
                          ? product.size.map((s) => `${s} mm`).join(", ")
                          : product.size
                          ? `${product.size} mm`
                          : "-"}
                      </p>
                    </div>
                  </motion.div>
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
