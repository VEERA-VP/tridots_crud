import React, { useEffect, useState } from "react";
import { ProductForm } from "./components/ProductForm";
import { ProductList } from "./components/ProductList";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export default function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      setProducts(data.products || []);
      setCategories(data.categories || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unexpected error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCreate = async (payload) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Failed to create product");
      }
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unexpected error");
    }
  };

  const handleUpdate = async (id, payload) => {
    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error("Failed to update product");
      }
      setEditingProduct(null);
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unexpected error");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this product?");
    if (!confirmed) return;

    try {
      setError("");
      const res = await fetch(`${API_BASE_URL}/api/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete product");
      }
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unexpected error");
    }
  };

  const onSubmitForm = (formValues) => {
    const payload = {
      ...formValues,
      price: Number(formValues.price),
      oldPrice:
        formValues.oldPrice !== "" && formValues.oldPrice !== null
          ? Number(formValues.oldPrice)
          : undefined,
      isActive: Boolean(formValues.isActive),
    };

    if (editingProduct && editingProduct._id) {
      handleUpdate(editingProduct._id, payload);
    } else {
      handleCreate(payload);
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Product Catalogue</h1>
        <p className="subtitle">
          Grocery Management System
        </p>
      </header>

      <main className="app-main">
        <section className="form-panel">
          <div className="panel-header">
            <h2>{editingProduct ? "Edit Product" : "Add Product"}</h2>
            {editingProduct && (
              <button className="link-button" onClick={handleCancelEdit}>
                Cancel edit
              </button>
            )}
          </div>

          <ProductForm
            categories={
              categories.length
                ? categories
                : [
                    "Vegetables",
                    "Fruits & Nuts",
                    "Dairy & creams",
                    "Packages Food",
                    "Staples",
                  ]
            }
            onSubmit={onSubmitForm}
            initialValues={editingProduct}
          />
        </section>

        <section className="list-panel">
          <div className="panel-header">
            <h2>Products</h2>
            <button className="icon-button refresh-button" onClick={fetchProducts} title="Refresh">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.5 3C12.307 1.86667 10.65 1.16667 8.83333 1.16667C5.16667 1.16667 2.16667 4.16667 2.16667 7.83333C2.16667 11.5 5.16667 14.5 8.83333 14.5C11.65 14.5 14.05 12.75 15.0833 10.25M13.5 3L16.3333 1.16667M13.5 3L15.3333 5.83333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {loading && <div className="info-banner">Loading...</div>}
          {error && <div className="error-banner">{error}</div>}

          <ProductList
            products={products}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </section>
      </main>

      <footer className="app-footer">
      </footer>
    </div>
  );
}