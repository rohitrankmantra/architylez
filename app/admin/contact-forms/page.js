"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/utils/api"; // ✅ axios instance

export default function ContactFormsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      const { data } = await api.get("/contact-forms");
      setContacts(data);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  // Delete handler
  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      await api.delete(`/contact-forms/${deleteTarget._id}`);
      setContacts((prev) =>
        prev.filter((c) => c._id !== deleteTarget._id)
      );
      toast.success("🗑️ Contact form deleted");
      setDeleteTarget(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Forms</h1>

      {loading ? (
        <p className="text-gray-500">Loading contacts...</p>
      ) : contacts.length === 0 ? (
        <p className="text-gray-500">No contact forms submitted yet.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow">
          <table className="w-full border border-gray-200 text-base">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-left font-semibold">Name</th>
                <th className="p-3 border text-left font-semibold">Email</th>
                <th className="p-3 border text-left font-semibold">Message</th>
                <th className="p-3 border text-left font-semibold">Date</th>
                <th className="p-3 border text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50 transition">
                  <td className="p-3 border">{c.name}</td>
                  <td className="p-3 border">{c.email}</td>
                  <td className="p-3 border max-w-xs truncate">{c.message}</td>
                  <td className="p-3 border">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border text-center">
                    <button
                      onClick={() => setDeleteTarget(c)}
                      className="text-red-600 hover:text-red-800 flex items-center justify-center h-8 w-8 rounded-full hover:bg-red-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Overlay */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold mb-3">Confirm Delete</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete the form from{" "}
              <span className="font-medium">{deleteTarget.name}</span>?
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
