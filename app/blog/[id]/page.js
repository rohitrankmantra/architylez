"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/utils/api";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Loader from "@/components/ui/Loader";

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      content: newComment,
      author: "You",
      createdAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  if (loading) return <Loader />;

  if (!blog)
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-center text-gray-600 bg-white">
        Blog not found.
      </div>
    );

  return (
    <>
      <Navigation />
      <div className="bg-white text-black min-h-screen">
        {/* Blog Hero */}
        <section className="min-h-[50vh] flex flex-col justify-center items-center text-center px-6 bg-gray-50">
          <h1 className="font-clash text-5xl md:text-6xl font-bold mb-4 leading-tight">
            {blog.title}
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            By <span className="font-space font-medium">{blog.author}</span> •{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          {blog.excerpt && (
            <p className="font-inter text-gray-600 text-lg max-w-2xl mx-auto">
              {blog.excerpt}
            </p>
          )}
        </section>

        {/* Blog Content */}
        <div className="max-w-4xl mx-auto px-6 py-12">
          {blog.thumbnail?.url && (
            <img
              src={blog.thumbnail.url}
              alt={blog.title}
              className="w-full rounded-2xl mb-8 object-cover"
            />
          )}

          <div
            className="prose max-w-full text-gray-800 mb-12"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Comments Section */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4 text-black">Comments</h2>

            <div className="space-y-3 max-h-60 overflow-y-auto mb-3">
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
              ) : (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 border rounded-md bg-gray-50"
                  >
                    <p className="text-gray-800">{c.content}</p>
                    <p className="text-gray-500 text-sm">
                      By {c.author} •{" "}
                      {new Date(c.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment..."
              className="w-full text-black p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 mb-2"
            />
            <button
              onClick={handleAddComment}
              className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors duration-300"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
