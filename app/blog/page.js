"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import api from "@/utils/api";

export default function Blog() {
  const containerRef = useRef(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openBlog, setOpenBlog] = useState(null); // for modal overlay
  const [commentsMap, setCommentsMap] = useState({}); // store comments per blog

  // Fetch blogs client-side
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get("/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Sort blogs by date
  const sortedBlogs = [...blogs].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const featuredPost = sortedBlogs[0];
  const regularPosts = sortedBlogs.slice(1);

  // GSAP hero animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  if (loading) return <div className="p-12 text-center">Loading...</div>;

  // Handle adding frontend-only comments
  const handleAddComment = (blogId, content) => {
    if (!content.trim()) return;
    const newComment = {
      id: Date.now(),
      content,
      author: "You",
      createdAt: new Date().toISOString(),
    };
    setCommentsMap((prev) => ({
      ...prev,
      [blogId]: prev[blogId] ? [...prev[blogId], newComment] : [newComment],
    }));
  };

  return (
    <>
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className="relative h-96 rounded-3xl overflow-hidden">
                  <img
                    src={featuredPost.thumbnail?.url}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full font-machina text-sm">
                    Featured
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="font-clash text-3xl md:text-4xl font-bold text-black leading-tight">
                    {featuredPost.title}
                  </h3>
                  <p className="font-inter text-gray-600 text-lg leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="font-space font-medium">{featuredPost.author}</span>
                      <span>•</span>
                      <span>{new Date(featuredPost.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="font-machina">{featuredPost.readTime || "5 min read"}</span>
                  </div>
                  <button
                    onClick={() => setOpenBlog(featuredPost)}
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-black text-white font-machina font-semibold rounded-full hover:bg-gray-900 transition-colors duration-300"
                  >
                    <span>Read Article</span>
                    <span>→</span>
                  </button>
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
              viewport={{ once: true }}
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
                  key={post._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-500"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.thumbnail?.url}
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
                        <span className="font-space font-medium">{post.author}</span>
                        <span>•</span>
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className="font-machina">{post.readTime || "5 min read"}</span>
                    </div>
                    <button
                      onClick={() => setOpenBlog(post)}
                      className="inline-flex items-center space-x-2 text-black hover:text-gray-600 transition-colors duration-300 font-machina font-medium text-sm"
                    >
                      <span>Read More</span>
                      <span>→</span>
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
{/* Modal Overlay */}
<AnimatePresence>
  {openBlog && (
    <motion.div
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={() => setOpenBlog(null)}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setOpenBlog(null)}
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          ×
        </button>

        {/* Blog Header */}
        <div className="px-6 pt-6">
          <h1 className="font-clash text-3xl md:text-4xl font-bold text-black leading-tight">{openBlog.title}</h1>
          <p className="text-gray-500 text-sm mb-4">
            By {openBlog.author} • {new Date(openBlog.createdAt).toLocaleDateString()}
          </p>
          {openBlog.excerpt && (
            <p className="text-gray-600 mb-6">{openBlog.excerpt}</p>
          )}
        </div>

        {/* Blog Thumbnail */}
        {openBlog.thumbnail?.url && (
          <img
            src={openBlog.thumbnail.url}
            alt={openBlog.title}
            className="w-full h-auto object-cover mb-6"
          />
        )}

        {/* Blog Content */}
        <div
          className="prose max-w-full px-6 text-gray-800 mb-6"
          dangerouslySetInnerHTML={{ __html: openBlog.content }}
        />

        {/* Comments Section */}
        <div className="px-6 pb-6 border-t pt-4">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="space-y-3 max-h-60 overflow-y-auto mb-3">
            {(commentsMap[openBlog._id] || []).map((c) => (
              <div key={c.id} className="p-3 border rounded-md bg-gray-50">
                <p className="text-gray-800">{c.content}</p>
                <p className="text-gray-500 text-sm">
                  By {c.author} • {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
          <textarea
            rows={3}
            value={openBlog.newComment || ""}
            onChange={(e) =>
              setOpenBlog({ ...openBlog, newComment: e.target.value })
            }
            placeholder="Write your comment..."
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mb-2"
          />
          <button
            onClick={() => {
              handleAddComment(openBlog._id, openBlog.newComment || "");
              setOpenBlog({ ...openBlog, newComment: "" });
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Post Comment
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
}
