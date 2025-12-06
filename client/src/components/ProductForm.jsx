import React, { useEffect, useState } from "react";

const emptyForm = {
  name: "",
  price: "",
  oldPrice: "",
  category: "",
  isActive: true,
  description: "",
};

export function ProductForm({ categories, onSubmit, initialValues }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialValues) {
      setForm({
        name: initialValues.name || "",
        price: initialValues.price ?? "",
        oldPrice:
          initialValues.oldPrice !== undefined &&
          initialValues.oldPrice !== null
            ? initialValues.oldPrice
            : "",
        category: initialValues.category || "",
        isActive:
          initialValues.isActive !== undefined
            ? initialValues.isActive
            : true,
        description: initialValues.description || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <div className="field-row">
        <label htmlFor="name">
          Product Name <span className="required">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Fresh Tomatoes"
          required
        />
      </div>

      <div className="field-grid">
        <div className="field-row">
          <label htmlFor="price">
            Price (₹) <span className="required">*</span>
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 199"
            required
          />
        </div>

        <div className="field-row">
          <label htmlFor="oldPrice">Old Price (₹)</label>
          <input
            id="oldPrice"
            name="oldPrice"
            type="number"
            step="0.01"
            min="0"
            value={form.oldPrice}
            onChange={handleChange}
            placeholder="e.g. 249"
          />
        </div>
      </div>

      <div className="field-grid">
        <div className="field-row">
          <label htmlFor="category">
            Category <span className="required">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="field-row checkbox-row">
          <label htmlFor="isActive">Active</label>
          <input
            id="isActive"
            name="isActive"
            type="checkbox"
            checked={form.isActive}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field-row">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows={3}
          value={form.description}
          onChange={handleChange}
          placeholder="Short description of the product..."
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="primary-button">
          {initialValues ? "Update product" : "Create product"}
        </button>
      </div>
    </form>
  );
}