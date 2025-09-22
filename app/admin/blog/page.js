"use client";

import { useState } from "react";
import { X, Pencil, Trash2 } from "lucide-react";

// Dummy Blogs
const dummyBlogs = [
  {
    _id: "1",
    title: "New Tile Collection 2025",
    content: "We are excited to launch our brand-new tile collection...",
    thumbnail: "https://via.placeholder.com/100",
    author: "Admin",
    category: "Updates",
    createdAt: "2025-09-18",
  },
  {
    _id: "2",
    title: "Design Tips for Modern Homes",
    content: "Here are some trending design tips for your living space...",
    thumbnail: "https://via.placeholder.com/100",
    author: "Admin",
    category: "Tips",
    createdAt: "2025-09-12",
  },
];

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState(dummyBlogs);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleDelete = (id) => {
    setBlogs(blogs.filter((b) => b._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Blogs</h1>

      {/* Blog Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Thumbnail</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Author</th>
            <th className="p-2 border">Created</th>
            <th className="p-2 border text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr key={b._id} className="hover:bg-gray-50">
              <td className="p-2 border">
                <img
                  src={b.thumbnail}
                  alt={b.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td
                className="p-2 border text-blue-600 cursor-pointer"
                onClick={() => setSelectedBlog(b)}
              >
                {b.title}
              </td>
              <td className="p-2 border">{b.category}</td>
              <td className="p-2 border">{b.author}</td>
              <td className="p-2 border">
                {new Date(b.createdAt).toLocaleDateString()}
              </td>
             <td className="p-2 border text-center align-middle">
  <div className="flex items-center justify-center gap-3 h-full">
    <button
      onClick={() => setSelectedBlog(b)}
      className="text-blue-600 hover:text-blue-800"
    >
      <Pencil size={16} />
    </button>
    <button
      onClick={() => handleDelete(b._id)}
      className="text-red-600 hover:text-red-800"
    >
      <Trash2 size={16} />
    </button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Overlay for Blog Details / Edit */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-3/4 max-w-2xl p-6 rounded-lg shadow-lg relative">
            {/* Close */}
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setSelectedBlog(null)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">Edit Blog</h2>

            <form className="space-y-4">
              <div>
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  defaultValue={selectedBlog.title}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Content</label>
                <textarea
                  defaultValue={selectedBlog.content}
                  className="w-full p-2 border rounded h-32"
                />
              </div>

              <div>
                <label className="block font-medium">Thumbnail</label>
                <input type="file" className="w-full p-2 border rounded" />
                <img
                  src={selectedBlog.thumbnail}
                  alt="thumb"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              </div>

              <div>
                <label className="block font-medium">Category</label>
                <select
                  defaultValue={selectedBlog.category}
                  className="w-full p-2 border rounded"
                >
                  <option>Updates</option>
                  <option>News</option>
                  <option>Tips</option>
                  <option>General</option>
                </select>
              </div>

              <div>
                <label className="block font-medium">Author</label>
                <input
                  type="text"
                  defaultValue={selectedBlog.author}
                  className="w-full p-2 border rounded"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
