"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";
import api from "@/utils/api";
import toast from "react-hot-toast";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Add or Update project
  const handleSubmit = async (e, projectId = null) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("category", e.target.category.value);

    if (e.target.thumbnail?.files[0]) {
      formData.append("thumbnail", e.target.thumbnail.files[0]);
    }

    if (e.target.images?.files.length > 0) {
      Array.from(e.target.images.files).forEach((file) =>
        formData.append("images", file)
      );
    }

    try {
      if (projectId) {
        await api.put(`/projects/${projectId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Project updated");
        setSelectedProject(null);
      } else {
        await api.post("/projects/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("✅ Project created");
        setIsAddModalOpen(false);
      }

      await fetchProjects();
    } catch (err) {
      console.error("❌ Error submitting project:", err);
      toast.error("Failed to submit project");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    setSubmitting(true);
    try {
      await api.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("✅ Project deleted");
    } catch (err) {
      console.error("❌ Error deleting project:", err);
      toast.error("Failed to delete project");
    } finally {
      setSubmitting(false);
      setConfirmDelete(null);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Plus size={18} /> Add Project
        </button>
      </div>

      {/* Projects Table */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading projects...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Thumbnail</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">
                    {p.thumbnail?.url ? (
                      <img
                        src={`${BASE_URL}${p.thumbnail.url}`}
                        alt={p.title}
                        className="w-20 h-28 object-cover rounded hover:scale-105 transition"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.jpg";
                        }}
                      />
                    ) : (
                      <span className="text-gray-400 italic">No thumbnail</span>
                    )}
                  </td>

                  <td
                    className="p-2 border text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setSelectedProject(p)}
                  >
                    {p.title}
                  </td>

                  <td className="p-2 border">{p.description}</td>
                  <td className="p-2 border">{p.category}</td>
                  <td className="p-2 border">
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="p-2 border text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedProject(p)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(p._id)}
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
        </div>
      )}

      {/* Add/Edit Modal */}
      {(isAddModalOpen || selectedProject) && (
        <ProjectModal
          title={isAddModalOpen ? "Add Project" : "Edit Project"}
          project={selectedProject}
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedProject(null);
          }}
          onSubmit={(e) =>
            handleSubmit(e, selectedProject ? selectedProject._id : null)
          }
          submitting={submitting}
        />
      )}

      {/* Delete Confirmation Modal */}
      {confirmDelete && (
        <DeleteModal
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => handleDelete(confirmDelete)}
          submitting={submitting}
        />
      )}
    </div>
  );
}

// === Project Modal ===
function ProjectModal({ title, project, onClose, onSubmit, submitting }) {
  const BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
  const [previewThumb, setPreviewThumb] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  const handleThumbChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreviewThumb(URL.createObjectURL(file));
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(urls);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-4">{title}</h2>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            defaultValue={project?.title || ""}
            placeholder="Title"
            className="w-full border rounded p-2"
            required
          />

          <textarea
            name="description"
            defaultValue={project?.description || ""}
            placeholder="Description"
            className="w-full border rounded p-2"
            required
          />

          <select
            name="category"
            defaultValue={project?.category || "General"}
            className="w-full border rounded p-2"
          >
            <option>Residential</option>
            <option>Commercial</option>
            <option>Hospitality</option>
            <option>General</option>
          </select>

          {/* Thumbnail Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Thumbnail</label>
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleThumbChange}
            />

            {(previewThumb || project?.thumbnail?.url) && (
              <img
                src={previewThumb || `${BASE_URL}${project.thumbnail.url}`}
                alt="Thumbnail"
                className="w-24 h-24 mt-2 object-cover rounded"
                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
              />
            )}
          </div>

          {/* Multiple Images Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Project Images
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
            />

            {(previewImages.length > 0 || project?.images?.length > 0) && (
              <div className="flex flex-wrap gap-2 mt-2">
                {previewImages.map((src, i) => (
                  <img
                    key={`new-${i}`}
                    src={src}
                    alt={`Preview ${i + 1}`}
                    className="w-20 h-20 object-cover rounded border"
                  />
                ))}
                {previewImages.length === 0 &&
                  project?.images?.map((img, i) => (
                    <img
                      key={`old-${i}`}
                      src={`${BASE_URL}${img.url}`}
                      alt={`Existing ${i + 1}`}
                      className="w-20 h-20 object-cover rounded border"
                      onError={(e) =>
                        (e.currentTarget.src = "/placeholder.jpg")
                      }
                    />
                  ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {submitting && <Loader2 className="animate-spin mr-2" size={18} />}
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

// === Delete Modal ===
function DeleteModal({ onCancel, onConfirm, submitting }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this project? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={submitting}
            className="flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          >
            {submitting && <Loader2 className="animate-spin mr-2" size={18} />}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
