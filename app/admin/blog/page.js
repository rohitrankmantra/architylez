"use client";

import { useState, useEffect } from "react";
import { X, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/utils/api.js";

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "Updates",
    author: "",
    thumbnail: null,
    thumbnailPreview: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/blogs");
      setBlogs(data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await api.delete(`/blogs/${deleteTarget._id}`);
      setBlogs(blogs.filter((b) => b._id !== deleteTarget._id));
      toast.success("Blog deleted successfully");
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    } finally {
      setDeleting(false);
    }
  };

  // Open edit form
  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt || "",
      content: blog.content,
      category: blog.category,
      author: blog.author,
      thumbnail: null,
      thumbnailPreview: blog.thumbnail?.url || "",
    });
    setShowForm(true);
  };

  // Open add form
  const handleAdd = () => {
    setSelectedBlog(null);
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      category: "Updates",
      author: "",
      thumbnail: null,
      thumbnailPreview: "",
    });
    setShowForm(true);
  };

  // Form change
  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnail" && files?.[0]) {
      setFormData({
        ...formData,
        thumbnail: files[0],
        thumbnailPreview: URL.createObjectURL(files[0]),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("excerpt", formData.excerpt);
      fd.append("content", formData.content);
      fd.append("category", formData.category);
      fd.append("author", formData.author);
      if (formData.thumbnail) fd.append("thumbnail", formData.thumbnail);

      if (selectedBlog) {
        await api.put(`/blogs/${selectedBlog._id}`, fd);
        toast.success("Blog updated successfully");
      } else {
        await api.post("/blogs/create", fd);
        toast.success("Blog added successfully");
      }
      fetchBlogs();
      setShowForm(false);
    } catch (err) {
      console.error("Error saving blog:", err);
      toast.error("Failed to save blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading blogs...</div>;

  return (
    <div className="p-6 h-[100vh] flex flex-col overflow-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          <Plus size={16} /> Add Blog
        </button>
      </div>

      {/* Blogs Table */}
      <div className="overflow-auto flex-1">
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border text-left font-medium">Thumbnail</th>
              <th className="p-3 border text-left font-medium">Title</th>
              <th className="p-3 border text-left font-medium">Category</th>
              <th className="p-3 border text-left font-medium">Author</th>
              <th className="p-3 border text-left font-medium">Created</th>
              <th className="p-3 border text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b._id} className="hover:bg-gray-50 transition text-base">
                <td className="p-3 border">
                  <img
                    src={b.thumbnail?.url || "/placeholder.jpg"}
                    alt={b.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3 border">{b.title}</td>
                <td className="p-3 border">{b.category}</td>
                <td className="p-3 border">{b.author}</td>
                <td className="p-3 border">
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 border text-center">
                  <div className="flex items-center justify-center gap-3 h-full">
                    <button
                      onClick={() => handleEdit(b)}
                      className="text-blue-600 hover:text-blue-800 flex items-center justify-center h-8 w-8"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(b)}
                      className="text-red-600 hover:text-red-800 flex items-center justify-center h-8 w-8"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Overlay */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-3/4 max-w-2xl p-6 rounded-lg shadow-lg relative max-h-[100vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowForm(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4">
              {selectedBlog ? "Edit Blog" : "Add Blog"}
            </h2>

            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Excerpt</label>
                <input
                  type="text"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded h-32"
                  required
                />
              </div>

              <div>
                <label className="block font-medium">Thumbnail</label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
                {formData.thumbnailPreview && (
                  <img
                    src={formData.thumbnailPreview}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                  />
                )}
              </div>

              <div>
                <label className="block font-medium">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleFormChange}
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
                  name="author"
                  value={formData.author}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className={`px-4 py-2 rounded text-white ${
                  saving
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {saving
                  ? selectedBlog
                    ? "Saving..."
                    : "Adding..."
                  : selectedBlog
                  ? "Save Changes"
                  : "Add Blog"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Overlay */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">
              Are you sure you want to delete "{deleteTarget.title}"?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className={`px-4 py-2 rounded text-white ${
                  deleting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
