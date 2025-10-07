"use client";

import { useState, useEffect } from "react";
import { X, Pencil, Trash2, Plus, Loader } from "lucide-react";
import api from "@/utils/api";
import toast from "react-hot-toast";

export default function HomeMetaPage() {
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Fetch Home Meta
  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const res = await api.get("/home-meta");
        setMeta(res.data || null);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load Home Meta");
      } finally {
        setLoading(false);
      }
    };
    fetchMeta();
  }, []);

  // Open Modal
  const openAddOrEdit = () => {
    setMetaTitle(meta?.title || "");
    setMetaDescription(meta?.description || "");
    setShowModal(true);
  };

  const closeModal = () => {
    setMetaTitle("");
    setMetaDescription("");
    setShowModal(false);
  };

  // Save Home Meta
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let res;
      if (meta) {
        // Update existing meta
        res = await api.put("/home-meta", {
          title: metaTitle,
          description: metaDescription,
        });
        setMeta(res.data);
        toast.success("✅ Home Meta updated");
      } else {
        // Create new meta (only if none exists)
        res = await api.post("/home-meta", {
          title: metaTitle,
          description: metaDescription,
        });
        setMeta(res.data);
        toast.success("✅ Home Meta created");
      }
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Home Meta");
    } finally {
      setSaving(false);
    }
  };

  // Delete Home Meta
  const handleDelete = async () => {
    if (!meta) return;
    setDeleting(true);
    try {
      await api.delete("/home-meta");
      setMeta(null);
      toast.success("✅ Home Meta deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete Home Meta");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl font-semibold">Home Meta</h1>
        <button
          onClick={openAddOrEdit}
          className={`inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded text-md ${
            meta ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={!!meta}
        >
          <Plus size={16} /> Add Home Meta
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : meta ? (
        <table className="w-full border-collapse text-md">
          <thead>
            <tr className="bg-gray-100 text-left text-base">
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Description</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50 align-top text-md">
              <td
                className="p-2 border cursor-pointer text-indigo-600 hover:underline"
                onClick={openAddOrEdit}
              >
                {meta.title}
              </td>
              <td className="p-2 border max-w-[30ch] truncate">{meta.description}</td>
              <td className="p-2 border text-center">
                <div className="inline-flex items-center gap-1">
                  <button
                    onClick={openAddOrEdit}
                    className="text-blue-600 hover:text-blue-800 p-1 rounded"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="text-red-600 hover:text-red-800 p-1 rounded"
                    title="Delete"
                    disabled={deleting}
                  >
                    {deleting ? <Loader size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p className="text-md text-gray-500">No Home Meta added yet.</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 pt-16 px-4">
          <div className="bg-white rounded-lg w-full max-w-md shadow-lg overflow-y-auto max-h-[80vh] text-sm p-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={18} />
            </button>

            <h2 className="text-base font-semibold mb-3">
              {meta ? "Edit Home Meta" : "Add Home Meta"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="Meta Title"
                className="w-full p-2 border rounded text-sm"
                required
              />
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Meta Description"
                className="w-full p-2 border rounded text-sm h-20"
                required
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1 border rounded text-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-[18px] flex items-center gap-2"
                  disabled={saving}
                >
                  {saving && <Loader size={14} className="animate-spin" />}
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
