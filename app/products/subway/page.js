"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "@/components/ui/Loader";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GvtTiles() {
  const containerRef = useRef(null);
  const [products, setProducts] = useState([]);

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

  // ✅ Later replace this with API fetch
  useEffect(() => {
    async function fetchProducts() {
      // Example:
      // const res = await fetch("/api/products?category=GVT");
      // const data = await res.json();
      // setProducts(data);

      setProducts([
        {
          id: "elegant-marble-finish",
          title: "Elegant Marble Finish",
          image: "https://picsum.photos/600/400?random=1",
          size: "600x600 mm",
          category: "subway",
        },
        {
          id: "textured-stone-look",
          title: "Textured Stone Look",
          image: "https://picsum.photos/600/400?random=2",
          size: "800x800 mm",
          category: "subway",
        },
        {
          id: "glossy-white-tile",
          title: "Glossy White Tile",
          image: "https://picsum.photos/600/400?random=3",
          size: "600x1200 mm",
          category: "subway",
        },
      ]);
    }
    fetchProducts();
  }, []);

  return (
    <Loader>
      <div ref={containerRef} className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.pexels.com/photos/1435752/pexels-photo-1435752.jpeg?auto=compress&cs=tinysrgb&w=1600')`,
            }}
          />
          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 text-center text-white px-6 max-w-4xl">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="font-clash text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-gradient">Premium</span>{" "}
              <span className="text-outline">Subway Tiles</span>
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
        <section className="reveal-section py-24 px-6 bg-primary-darker">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
                <span className="text-white">Our</span>{" "}
                <span className="text-outline">Collections</span>
              </h2>
              <p className="font-inter text-primary-gray text-lg max-w-2xl mx-auto">
                Discover premium GVT tile collections designed for durability,
                elegance, and timeless appeal.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, i) => (
                <Link key={i} href={`/products/gvt/${product.id}`}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="group relative rounded-2xl overflow-hidden shadow-lg bg-primary-dark cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-all duration-300" />
                    <div className="absolute top-4 left-4 bg-primary-gold text-primary-dark px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                      {product.category}
                    </div>
                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="font-space text-xl font-semibold">
                        {product.title}
                      </h3>
                      <p className="text-primary-gray text-sm">{product.size}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Loader>
  );
}
