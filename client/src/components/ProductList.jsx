import React from "react";

export function ProductList({ products, onEdit, onDelete }) {
  if (!products.length) {
    return (
      <div className="card empty-card">
        <p>No products found. Start by adding a new product.</p>
      </div>
    );
  }

  return (
    <div className="card table-card">
      <table className="data-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Old Price</th>
            <th>Active</th>
            <th>Description</th>
            <th style={{ width: "120px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="product-name-cell">
                <span className="product-name">{p.name}</span>
              </td>
              <td>{p.category}</td>
              <td>₹{Number(p.price).toFixed(2)}</td>
              <td>
                {p.oldPrice !== undefined && p.oldPrice !== null
                  ? `₹${Number(p.oldPrice).toFixed(2)}`
                  : "—"}
              </td>
              <td>
                <span
                  className={
                    p.isActive ? "status-pill active" : "status-pill inactive"
                  }
                >
                  {p.isActive ? "Active" : "Inactive"}
                </span>
              </td>
              <td className="description-cell">
                {p.description || <span className="muted">No description</span>}
              </td>
              <td>
                <div className="table-actions">
                  <button
                    type="button"
                    className="icon-button edit-button"
                    onClick={() => onEdit(p)}
                    title="Edit"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.333 2.00001C11.5084 1.82464 11.7163 1.68606 11.9439 1.59331C12.1715 1.50057 12.4142 1.45557 12.6587 1.46131C12.9031 1.46706 13.1442 1.52337 13.3671 1.62669C13.59 1.73001 13.7903 1.87817 13.9567 2.06201C14.123 2.24585 14.2521 2.46178 14.3369 2.69691C14.4217 2.93205 14.4604 3.18175 14.4507 3.43131C14.4409 3.68087 14.3829 3.92543 14.28 4.15001L5.94667 12.4833L2 13.3333L2.85 9.38667L11.333 2.00001Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="icon-button delete-button"
                    onClick={() => onDelete(p._id)}
                    title="Delete"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2 4H14M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2.31305 5.47381 1.97391 5.72386 1.72386C5.97391 1.47381 6.31305 1.33333 6.66667 1.33333H9.33333C9.68696 1.33333 10.0261 1.47381 10.2761 1.72386C10.5262 1.97391 10.6667 2.31305 10.6667 2.66667V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}