"use client";

import { useEffect, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { gsap } from "gsap";

export default function BlogContent({ blog }) {
  const containerRef = useRef(null);
  const [comments, setComments] = useState([
    // Optional: you can seed with initial dummy comments
  ]);
  const [newComment, setNewComment] = useState("");

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

  // Add comment (frontend only)
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      _id: Date.now(), // temporary ID
      content: newComment,
      author: "Anonymous",
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  return (
    <>
      <Navigation />

      <div ref={containerRef} className="bg-white text-gray-900">
        {/* Hero Section */}
        <section className="min-h-[50vh] flex flex-col items-center justify-center px-6 bg-gray-50">
          <div className="hero-content max-w-3xl mx-auto text-center space-y-4">
            <h1 className="font-clash text-4xl md:text-5xl font-bold leading-snug text-gray-900">
              {blog.title}
            </h1>
            <p className="font-inter text-gray-600 text-sm md:text-base">
              By <span className="font-medium">{blog.author}</span> •{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-16 px-6 max-w-3xl mx-auto space-y-8">
          {blog.thumbnail?.url && (
            <img
              src={blog.thumbnail.url}
              alt={blog.title}
              className="w-full h-auto rounded-2xl shadow-md"
            />
          )}

          <p className="text-gray-700 text-lg leading-relaxed">{blog.excerpt}</p>

          <div
            className="prose prose-lg max-w-full text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <hr className="border-t border-gray-200 mt-8" />

          {/* Comments Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Comments</h2>

            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet. Be the first to comment!</p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="p-4 border rounded-xl bg-gray-50"
                  >
                    <p className="text-gray-800">{comment.content}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      By {comment.author} •{" "}
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <div className="mt-6 flex flex-col space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                rows={4}
              />
              <button
                onClick={handleAddComment}
                className="self-start px-6 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
              >
                Post Comment
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
