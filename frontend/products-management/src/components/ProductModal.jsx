import React, { useState, useEffect } from "react";
import api from "../utils/api";

export const ProductModal = ({
  isOpen,
  onClose,
  onSave,
  editingProduct = null,
}) => {
  const categories = [
    "Electronics",
    "Clothing",
    "Food",
    "Books",
    "Sports",
    "Accessories",
  ];

  const initialFormState = {
    name: "",
    category: "Electronics",
    price: "",
    imageUrl: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  // 🔄 Synchronize form data when switching between Add and Edit modes
  useEffect(() => {
    if (isOpen) {
      if (editingProduct) {
        setFormData({
          name: editingProduct.name || "",
          category: editingProduct.category || "Electronics",
          price: editingProduct.price ? editingProduct.price.toString() : "",
          imageUrl: editingProduct.imageUrl || "",
          description: editingProduct.description || "",
        });
      } else {
        setFormData(initialFormState);
      }
      setErrors({}); // Clear errors whenever modal opens
    }
  }, [isOpen, editingProduct]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const saveProduct = async (product) => {
    const response = await api.post("/products", product, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.status);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Product name is required";
    if (
      !formData.price ||
      isNaN(formData.price) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Please enter a valid price greater than 0";
    }
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare payload, retaining the database _id if we are editing
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="p-4 z-50 justify-center bg-slate-900/40 fixed inset-0 flex items-center backdrop-blur-sm">
      <div className="flex-col bg-white rounded-2xl border border-slate-100 shadow-xl max-w-lg w-full overflow-hidden max-h-[90vh] flex">
        {/* Dynamic Header Title */}
        <div className="px-6 py-4 border-b border-slate-100 justify-between flex items-center">
          <h2 className="text-lg font-bold text-slate-900">
            {editingProduct
              ? "Edit Product Details"
              : "Add New Inventory Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 rounded-lg hover:text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 p-6 overflow-y-auto space-y-4"
        >
          {/* Name Input */}
          <div>
            <label className="mb-1 text-xs font-semibold text-slate-700 block uppercase tracking-wider">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Wireless Bluetooth Headphones"
              className={`w-full px-3.5 py-2 text-sm bg-white border ${errors.name ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-slate-900"} rounded-xl focus:outline-none focus:ring-2`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Category & Price Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 text-xs font-semibold text-slate-700 block uppercase tracking-wider">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="px-3.5 py-2 w-full text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 text-xs font-semibold text-slate-700 block uppercase tracking-wider">
                Price (\$) *
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className={`w-full px-3.5 py-2 text-sm bg-white border ${errors.price ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-slate-900"} rounded-xl focus:outline-none focus:ring-2`}
              />
              {errors.price && (
                <p className="mt-1 text-xs text-red-500">{errors.price}</p>
              )}
            </div>
          </div>

          {/* Image URL Input */}
          <div>
            <label className="mb-1 text-xs font-semibold text-slate-700 block uppercase tracking-wider">
              Product Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com"
              className="px-3.5 py-2 mb-2 w-full text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900"
            />

            {formData.imageUrl && (
              <div className="mt-2 p-2 gap-3 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 flex items-center">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-12 h-12 object-contain bg-white rounded-lg border border-slate-100"
                  onError={(e) => (e.target.style.display = "none")}
                />
                <span className="text-xs text-slate-400 font-medium truncate">
                  {formData.imageUrl}
                </span>
              </div>
            )}
          </div>

          {/* Description Input */}
          <div>
            <label className="mb-1 text-xs font-semibold text-slate-700 block uppercase tracking-wider">
              Description *
            </label>
            <textarea
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide clean product specs..."
              className={`w-full px-3.5 py-2 text-sm bg-white border ${errors.description ? "border-red-500 focus:ring-red-500" : "border-slate-200 focus:ring-slate-900"} rounded-xl focus:outline-none focus:ring-2 resize-none`}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Form Actions Footer */}
          <div className="pt-4 gap-3 border-t border-slate-100 justify-end flex items-center">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl bg-white hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-xl shadow-sm hover:bg-slate-800 transition-colors"
            >
              {editingProduct ? "Update Item" : "Create Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
