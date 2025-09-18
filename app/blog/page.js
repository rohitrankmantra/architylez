"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import Link from "next/link";
import Loader from "@/components/ui/Loader";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Blog() {
  const containerRef = useRef(null);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Sustainable Architecture",
      excerpt:
        "Exploring innovative eco-friendly materials and design principles that are reshaping modern architecture.",
      author: "Alexandra Chen",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Sustainability",
      image:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      featured: true,
    },
    {
      id: 2,
      title: "Luxury Interior Trends 2024",
      excerpt:
        "Discover the latest trends in luxury interior design, from maximalist aesthetics to minimalist elegance.",
      author: "Marcus Rodriguez",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Interior Design",
      image:
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
      featured: false,
    },
    {
      id: 3,
      title: "Smart Home Integration in Modern Design",
      excerpt:
        "How to seamlessly incorporate cutting-edge technology into contemporary architectural projects.",
      author: "Sophie Williams",
      date: "March 10, 2024",
      readTime: "10 min read",
      category: "Technology",
      image:
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      featured: false,
    },
    {
      id: 4,
      title: "Material Innovations in Tile Design",
      excerpt:
        "Revolutionary materials and manufacturing techniques that are transforming tile design possibilities.",
      author: "Alexandra Chen",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Materials",
      image:
        "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=800",
      featured: false,
    },
    {
      id: 5,
      title: "Creating Timeless Bathroom Spaces",
      excerpt:
        "Design principles and material choices for bathrooms that stand the test of time.",
      author: "Marcus Rodriguez",
      date: "March 5, 2024",
      readTime: "9 min read",
      category: "Design Tips",
      image:
        "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=800",
      featured: false,
    },
    {
      id: 6,
      title: "The Art of Space Planning",
      excerpt:
        "Master the fundamentals of effective space planning in residential and commercial projects.",
      author: "Sophie Williams",
      date: "March 3, 2024",
      readTime: "5 min read",
      category: "Planning",
      image:
        "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      featured: false,
    },
  ];

  const featuredPost = blogPosts.find((post) => post.featured);
  const regularPosts = blogPosts.filter((post) => !post.featured);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });

      gsap.from(".blog-grid", {
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
        <section className="min-h-[65vh] flex items-center justify-center px-6 bg-gray-50">
          <div className="hero-content max-w-4xl mx-auto text-center space-y-8">
            <h1 className="font-clash text-5xl md:text-7xl font-bold leading-tight">
              <span className="text-black">Design</span>{" "}
              <span className="text-outline">Insights</span>
            </h1>
            <p className="font-inter text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Explore the latest trends, insights, and stories from the world of
              architecture and interior design. Stay inspired with expert tips
              and innovative solutions.
            </p>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Image */}
                <div className="relative h-96 rounded-3xl overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full font-machina text-sm">
                    Featured
                  </div>
                </div>
                {/* Content */}
                <div className="space-y-6">
                  <h3 className="font-clash text-3xl md:text-4xl font-bold text-black leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="font-inter text-gray-600 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="font-space font-medium">
                        {featuredPost.author}
                      </span>
                      <span>•</span>
                      <span>{featuredPost.date}</span>
                    </div>
                    <span className="font-machina">
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${featuredPost.id}`}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-black text-white font-machina font-semibold rounded-full hover:bg-gray-900 transition-colors duration-300"
                  >
                    <span>Read Article</span>
                    <span>→</span>
                  </Link>
                </div>
              </motion.article>
            </div>
          </section>
        )}

        {/* Blog Grid */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-clash text-4xl md:text-6xl font-bold mb-6">
                <span className="text-outline">Latest</span>{" "}
                <span className="text-black">Articles</span>
              </h2>
            </motion.div>

            <div className="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full font-machina text-sm">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <h3 className="font-space text-xl font-semibold text-black mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-inter text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <span className="font-space font-medium">
                          {post.author}
                        </span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <span className="font-machina">{post.readTime}</span>
                    </div>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center space-x-2 text-black hover:text-gray-600 transition-colors duration-300 font-machina font-medium text-sm"
                    >
                      <span>Read More</span>
                      <span>→</span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </Loader>
  );
}
