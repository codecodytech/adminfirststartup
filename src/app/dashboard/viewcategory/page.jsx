"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ViewCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // track which category is being deleted

  useEffect(() => {
    setMounted(true);

    fetch("https://api2.firststartup.in/category/categoryList?adminId=1")
      .then((res) => res.json())
      .then((data) => {
        if (data.responseCode === 200) {
          setCategories(data.responseResult);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err))
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  // Delete category function
  const handleDelete = async (categoryId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    setDeletingId(categoryId);

    try {
      const res = await fetch(
        `https://api2.firststartup.in/category/deleteCategory?categoryId=${categoryId}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.responseCode === 200) {
        toast.success(data.responseMessage);

        // Remove from UI
        setCategories((prev) => prev.filter((cat) => cat._id !== categoryId));
      } else {
        toast.error(data.responseMessage || "Failed to delete category");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <ToastContainer />

      <h1 className="text-3xl font-bold mb-8 text-center">Categories</h1>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white p-6 rounded-xl shadow-md h-28"
            >
              <div className="h-5 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          ))}
        </div>
      )}

      {/* Category List */}
      {!loading && categories.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-all relative"
            >
              {/* Delete button */}
              <button
                onClick={() => handleDelete(cat._id)}
                disabled={deletingId === cat._id}
                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow transition-all"
                title="Delete Category"
              >
                {deletingId === cat._id ? (
                  <div className="animate-spin border-b-2 border-white w-4 h-4 rounded-full"></div>
                ) : (
                  "🗑"
                )}
              </button>

              <h2 className="text-xl font-semibold text-gray-800 mb-2 capitalize">
                {cat.categoryName}
              </h2>

              <p className="text-gray-500 text-sm mb-1">
                Category ID:{" "}
                <span className="font-medium text-gray-700">{cat.id}</span>
              </p>

              <p className="text-gray-500 text-sm">
                Created:{" "}
                {new Date(cat.createdAt).toLocaleDateString("en-US")}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* No Data */}
      {!loading && categories.length === 0 && (
        <p className="text-center text-gray-600 text-lg">
          No categories found.
        </p>
      )}
    </div>
  );
}
