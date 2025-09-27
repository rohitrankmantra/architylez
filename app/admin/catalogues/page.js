"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";
import api from "@/utils/api";
import toast from "react-hot-toast";

export default function CataloguesPage() {
  const [catalogues, setCatalogues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCatalogue, setSelectedCatalogue] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    const fetchCatalogues = async () => {
      try {
        const res = await api.get("/catalogues");
        setCatalogues(res.data);
      } catch (err) {
        console.error("❌ Error fetching catalogues:", err);
        toast.error("Failed to load catalogues");
      } finally {
        setLoading(false);
      }
    };
    fetchCatalogues();
  }, []);

  const handleDelete = async (id) => {
    setSubmitting(true);
    try {
      await api.delete(`/catalogues/${id}`);
      setCatalogues((prev) => prev.filter((c) => c._id !== id));
      toast.success("✅ Catalogue deleted");
    } catch (err) {
      console.error("❌ Error deleting catalogue:", err);
      toast.error("Failed to delete catalogue");
    } finally {
      setSubmitting(false);
      setConfirmDelete(null);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const file = e.target.pdf.files[0];
    if (!file) {
      toast.error("Please select a PDF file");
      setSubmitting(false);
      return;
    }
    if (file.type !== "application/pdf") {
      toast.error("❌ Only PDF files are allowed");
      setSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("category", e.target.category.value);
    formData.append("pdf", file);

    try {
      const res = await api.post("/catalogues/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("✅ Catalogue created");
      setCatalogues((prev) => [res.data.catalogue, ...prev]);
      setIsAddModalOpen(false);
    } catch (err) {
      console.error("❌ Error creating catalogue:", err);
      toast.error("Failed to create catalogue");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("category", e.target.category.value);
    if (e.target.pdf.files[0]) formData.append("pdf", e.target.pdf.files[0]);

    try {
      const res = await api.put(`/catalogues/${selectedCatalogue._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCatalogues((prev) =>
        prev.map((c) => (c._id === res.data.catalogue._id ? res.data.catalogue : c))
      );
      setSelectedCatalogue(null);
      toast.success("✅ Catalogue updated");
    } catch (err) {
      console.error("❌ Error updating catalogue:", err);
      toast.error("Failed to update catalogue");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Catalogues</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <Plus size={18} /> Add Catalogue
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading catalogues...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 border">Thumbnail</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">File</th>
                <th className="p-2 border">Created</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {catalogues.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  {/* Thumbnail */}
                <td className="p-2 border">
  {c.thumbnail?.url ? (
    <img
      src={c.thumbnail.url}
      alt={c.title}
      className="w-20 h-28 object-cover rounded hover:scale-105 transition"
      onError={(e) => { e.currentTarget.src = "/placeholder.jpg"; }} // fallback image
    />
  ) : (
    <span className="text-gray-400 italic">No thumbnail</span>
  )}
</td>

                  {/* Title */}
                  <td
                    className="p-2 border text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setSelectedCatalogue(c)}
                  >
                    {c.title}
                  </td>

                  {/* Description */}
                  <td className="p-2 border">{c.description}</td>

                  {/* Category */}
                  <td className="p-2 border">{c.category}</td>

                  {/* PDF Link */}
                  <td className="p-2 border">
                    {c.pdf?.url ? (
                      <a
                        href={c.pdf.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View File
                      </a>
                    ) : (
                      <span className="text-gray-400 italic">No file</span>
                    )}
                  </td>

                  {/* Created */}
                  <td className="p-2 border">{new Date(c.createdAt).toLocaleDateString()}</td>

                  {/* Actions */}
                  <td className="p-2 border text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setSelectedCatalogue(c)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(c._id)}
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

      {(isAddModalOpen || selectedCatalogue) && (
        <CatalogueModal
          title={isAddModalOpen ? "Add Catalogue" : "Edit Catalogue"}
          catalogue={selectedCatalogue}
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedCatalogue(null);
          }}
          onSubmit={isAddModalOpen ? handleAdd : handleUpdate}
          submitting={submitting}
        />
      )}

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

// === Catalogue Modal
function CatalogueModal({ title, catalogue, onClose, onSubmit, submitting }) {
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
            defaultValue={catalogue?.title || ""}
            placeholder="Title"
            className="w-full border rounded p-2"
            required
          />
          <textarea
            name="description"
            defaultValue={catalogue?.description || ""}
            placeholder="Description"
            className="w-full border rounded p-2"
            required
          />
          <select
            name="category"
            defaultValue={catalogue?.category || "General"}
            className="w-full border rounded p-2"
          >
            <option>GVT</option>
            <option>Subway</option>
            <option>Wall</option>
            <option>Wood</option>
            <option>General</option>
          </select>
          <input type="file" name="pdf" accept=".pdf,application/pdf" />
          {/* Show current PDF */}
          {catalogue?.pdf?.url && (
            <a
              href={catalogue.pdf.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline block"
            >
              Current File
            </a>
          )}
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

// === Delete Modal
function DeleteModal({ onCancel, onConfirm, submitting }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="mb-6 text-gray-600">
          Are you sure you want to delete this catalogue? This action cannot be undone.
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
