"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function BlogClient({ blog }) {
  const containerRef = useRef(null);
  const [comments, setComments] = useState([]);
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

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const comment = {
      _id: Date.now(),
      content: newComment,
      author: "Anonymous",
      createdAt: new Date().toISOString(),
    };
    setComments(prev => [...prev, comment]);
    setNewComment("");
  };

  return (
    <div ref={containerRef} className="bg-white text-gray-900 min-h-screen px-6 md:px-20 py-12">
      {/* Hero */}
      <section className="hero-content max-w-3xl mx-auto text-center space-y-4 mb-12">
        <h1 className="font-clash text-4xl md:text-5xl font-bold">{blog.title}</h1>
        <p className="text-gray-600 text-sm md:text-base">
          By <span className="font-medium">{blog.author}</span> • {new Date(blog.createdAt).toLocaleDateString()}
        </p>
      </section>

      {/* Content */}
      {blog.thumbnail?.url && (
        <img src={blog.thumbnail.url} alt={blog.title} className="w-full h-auto rounded-2xl shadow-md mb-6" />
      )}
      <div dangerouslySetInnerHTML={{ __html: blog.content }} className="prose prose-lg text-gray-800 mb-8" />

      {/* Comments */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Comments</h2>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          <div className="space-y-4">
            {comments.map(c => (
              <div key={c._id} className="p-4 border rounded-xl bg-gray-50">
                <p className="text-gray-800">{c.content}</p>
                <p className="text-gray-500 text-sm mt-1">
                  By {c.author} • {new Date(c.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex flex-col space-y-3">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
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
    </div>
  );
}
