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

  // Decode HTML entities (optional)
  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
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
        <section className="min-h-[50vh] flex flex-col pt-32 sm:pt-40 pb-24 sm:pb-32 justify-center items-center text-center px-4 sm:px-6 bg-gray-50">
          <h1 className="font-clash text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            {blog.title}
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
            By <span className="font-space font-medium">{blog.author}</span> •{" "}
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          {blog.excerpt && (
            <p className="font-inter text-gray-600 text-sm sm:text-base md:text-lg max-w-md sm:max-w-xl md:max-w-2xl mx-auto">
              {decodeHtml(blog.excerpt)}
            </p>
          )}
        </section>

        {/* Blog Content */}
        <div className="max-w-3xl sm:max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
          {/* Main Thumbnail */}
          {blog.thumbnail?.url && (
            <img
              src={blog.thumbnail.url}
              alt={blog.title}
              className="w-full rounded-2xl object-cover"
            />
          )}

          {/* Render HTML Content */}
          <div
            className="prose max-w-full text-gray-800 leading-relaxed text-sm sm:text-base md:text-lg"
            dangerouslySetInnerHTML={{ __html: decodeHtml(blog.content) }}
          />

          {/* Additional Images */}
          {blog.images && blog.images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              {blog.images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.url}
                  alt={`${blog.title} image ${idx + 1}`}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-2xl"
                />
              ))}
            </div>
          )}

          {/* Comments Section */}
          <div className="border-t pt-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-black">
              Comments
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto mb-3">
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet.</p>
              ) : (
                comments.map((c) => (
                  <div key={c.id} className="p-3 border rounded-md bg-gray-50">
                    <p className="text-gray-800">{c.content}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">
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

