"use client";

import { useState, useEffect } from "react";
import {
  X,
  Pencil,
  Trash2,
  Plus,
  Image as ImageIcon,
  Trash,
  Loader
} from "lucide-react";
import api from "@/utils/api";
import toast from "react-hot-toast";

const SIZE_OPTIONS = [
  "600×600",
  "300×600",
  "450×450",
  "800×800",
  "300×300",
  "1200×600",
];

const FINISH_OPTIONS = [
  "Matte",
  "Glossy",
  "Honed",
  "Polished",
  "Textured",
  "Satin",
];

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  // modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [sizeInput, setSizeInput] = useState("");
  const [selectedFinishes, setSelectedFinishes] = useState([]);
  const [finishInput, setFinishInput] = useState("");

  // === fetch products ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // === modal helpers ===
  const openAdd = () => {
    setSelectedProduct({});
    setThumbnailPreview(null);
    setImagePreviews([]);
    setSelectedSizes([]);
    setSelectedFinishes([]);
    setSizeInput("");
    setFinishInput("");
  };

  const openEdit = (p) => {
    setSelectedProduct(p);
    setThumbnailPreview(p.thumbnail || null);
    setImagePreviews(Array.isArray(p.images) ? [...p.images] : []);
    setSelectedSizes(
      p.size ? (Array.isArray(p.size) ? p.size : p.size.split(",").map((s) => s.trim())) : []
    );
    setSelectedFinishes(
      p.finish ? (Array.isArray(p.finish) ? p.finish : p.finish.split(",").map((f) => f.trim())) : []
    );
    setSizeInput("");
    setFinishInput("");
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setThumbnailPreview(null);
    setImagePreviews([]);
    setSelectedSizes([]);
    setSelectedFinishes([]);
    setSizeInput("");
    setFinishInput("");
  };

  // === size/finish selection ===
  const toggleSize = (size) =>
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );

  const addCustomSize = () => {
    const value = sizeInput.trim();
    if (!value) return;
    if (!selectedSizes.includes(value)) setSelectedSizes((p) => [...p, value]);
    if (!SIZE_OPTIONS.includes(value)) SIZE_OPTIONS.push(value);
    setSizeInput("");
  };

  const toggleFinish = (f) =>
    setSelectedFinishes((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );

  const addCustomFinish = () => {
    const value = finishInput.trim();
    if (!value) return;
    if (!selectedFinishes.includes(value)) setSelectedFinishes((p) => [...p, value]);
    if (!FINISH_OPTIONS.includes(value)) FINISH_OPTIONS.push(value);
    setFinishInput("");
  };

  // === file uploads ===
  const handleThumbnailUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailPreview(URL.createObjectURL(file)); // preview only
  };

  const handleImagesUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]); // preview only
  };

  const handleDeleteImage = (index) =>
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));

  const handleRemoveThumbnail = () => setThumbnailPreview(null);

  // === API delete ===
  const handleDeleteProduct = async (id) => {
    setDeletingId(id);
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("✅ Product deleted");
    } catch (err) {
      console.error("❌ Error deleting product:", err);
      toast.error("Failed to delete product");
    } finally {
      setDeletingId(null);
      setConfirmDelete(null);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    const form = e.target;
    const isEdit = !!selectedProduct?._id;

    const formData = new FormData();
    formData.append("title", form.title.value.trim() || "Untitled");
    formData.append("description", form.description.value.trim() || "");
    formData.append("category", form.category.value);
    selectedSizes.forEach((s) => formData.append("size", s));
    selectedFinishes.forEach((f) => formData.append("finish", f));

    if (form.thumbnail?.files?.[0]) {
      formData.append("thumbnail", form.thumbnail.files[0]);
    }

    if (form.images?.files?.length) {
      Array.from(form.images.files).forEach((file) =>
        formData.append("images", file)
      );
    }

    try {
      let res;
      if (isEdit) {
        res = await api.put(`/products/${selectedProduct._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts((prev) =>
          prev.map((p) => (p._id === selectedProduct._id ? res.data.product : p))
        );
        toast.success("✅ Product updated");
      } else {
        res = await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts((prev) => [res.data.product, ...prev]);
        toast.success("✅ Product created");
      }
      closeModal();
    } catch (err) {
      console.error("❌ Error saving product:", err);
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-sm font-semibold">Products</h1>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-2 py-1 bg-green-600 text-white rounded text-xs"
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading products...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-xs">
                <th className="p-2 border">Thumb</th>
                <th className="p-2 border">Title</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Size</th>
                <th className="p-2 border">Finish</th>
                <th className="p-2 border">Images</th>
                <th className="p-2 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50 align-top text-xs">
                  <td className="p-2 border w-14">
                    <img
                      src={p.thumbnail?.url}
                      alt={p.title}
                      className="w-10 h-10 object-cover rounded"
                    />
                  </td>
                  <td
                    className="p-2 border text-indigo-600 cursor-pointer hover:underline"
                    onClick={() => openEdit(p)}
                  >
                    {p.title}
                  </td>
                  <td className="p-2 border max-w-[28ch] truncate">
                    {p.description}
                  </td>
                  <td className="p-2 border">{p.category}</td>
                  <td className="p-2 border">
                    {Array.isArray(p.size) ? p.size.join(", ") : p.size}
                  </td>
                  <td className="p-2 border">
                    {Array.isArray(p.finish) ? p.finish.join(", ") : p.finish}
                  </td>
                  <td className="p-2 border">
                    <div className="flex gap-1 items-center">
                      {Array.isArray(p.images) && p.images.length > 0 ? (
                        p.images.slice(0, 4).map((img, i) => (
                          <img
                            key={i}
                            src={img.url}
                            alt={`${p.title}-img-${i}`}
                            className="w-8 h-8 object-cover rounded"
                          />
                        ))
                      ) : (
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <ImageIcon size={12} /> no images
                        </div>
                      )}
                      {Array.isArray(p.images) && p.images.length > 4 && (
                        <div className="text-xs text-gray-500">
                          +{p.images.length - 4}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-2 border text-center">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded"
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(p._id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded"
                        title="Delete"
                      >
                        {deletingId === p._id ? (
                          <Loader size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for add/edit */}
      {selectedProduct !== null && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-16 px-4">
          <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg overflow-y-auto max-h-[80vh] text-sm p-4 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X size={18} />
            </button>

            <h2 className="text-base font-semibold mb-3">
              {selectedProduct?._id ? "Edit Product" : "Add Product"}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              {/* title */}
              <input
                name="title"
                defaultValue={selectedProduct?.title || ""}
                placeholder="Title"
                className="w-full p-2 border rounded text-sm"
              />

              {/* description */}
              <textarea
                name="description"
                defaultValue={selectedProduct?.description || ""}
                placeholder="Description"
                className="w-full p-2 border rounded text-sm h-20"
              />

              {/* thumbnail */}
              <div>
                <label className="block text-xs font-medium mb-1">Thumbnail</label>
                {thumbnailPreview ? (
                  <div className="relative w-24 h-24">
                    <img
                      src={thumbnailPreview}
                      alt="thumb"
                      className="w-24 h-24 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveThumbnail}
                      className="absolute -top-2 -right-2 bg-white border rounded-full p-1 text-red-600"
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 border rounded flex items-center justify-center text-xs text-gray-400">
                    No thumbnail
                  </div>
                )}
                <input
                  type="file"
                  name="thumbnail"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="mt-2 text-xs"
                />
              </div>

              {/* category */}
              <div>
                <label className="block text-xs font-medium mb-1">Category</label>
                <select
                  name="category"
                  defaultValue={selectedProduct?.category || "Wall"}
                  className="w-full p-2 border rounded text-sm"
                >
                  <option>GVT</option>
                  <option>Subway</option>
                  <option>Wall</option>
                  <option>Wood</option>
                </select>
              </div>

              {/* sizes */}
              <div>
                <label className="block text-xs font-medium mb-1">Sizes</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {SIZE_OPTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSize(s)}
                      className={`px-2 py-1 border rounded text-xs ${
                        selectedSizes.includes(s)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    placeholder="Custom size"
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <button
                    type="button"
                    onClick={addCustomSize}
                    className="px-3 py-1 bg-indigo-600 text-white rounded text-xs"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* finishes */}
              <div>
                <label className="block text-xs font-medium mb-1">Finish</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {FINISH_OPTIONS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => toggleFinish(f)}
                      className={`px-2 py-1 border rounded text-xs ${
                        selectedFinishes.includes(f)
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={finishInput}
                    onChange={(e) => setFinishInput(e.target.value)}
                    placeholder="Custom finish"
                    className="flex-1 p-2 border rounded text-sm"
                  />
                  <button
                    type="button"
                    onClick={addCustomFinish}
                    className="px-3 py-1 bg-indigo-600 text-white rounded text-xs"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* product images */}
              <div>
                <label className="block text-xs font-medium mb-1">Product Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {imagePreviews.map((img, i) => (
                    <div key={i} className="relative w-20 h-20">
                      <img
                        src={img}
                        alt={`img-${i}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(i)}
                        className="absolute -top-2 -right-2 bg-white border rounded-full p-1 text-red-600"
                      >
                        <Trash size={12} />
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="file"
                  name="images"
                  multiple
                  accept="image/*"
                  onChange={handleImagesUpload}
                  className="mt-2 text-xs"
                />
              </div>

              {/* buttons */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1 border rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-xs flex items-center gap-2"
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

      {/* Delete confirmation overlay */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white p-6 rounded shadow-md text-center">
            <p className="mb-4">Are you sure you want to delete this product?</p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-3 py-1 border rounded text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProduct(confirmDelete)}
                className="px-3 py-1 bg-red-600 text-white rounded text-sm flex items-center gap-2"
                disabled={deletingId === confirmDelete}
              >
                {deletingId === confirmDelete && <Loader size={14} className="animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
