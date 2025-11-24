"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://api2.firststartup.in/category/addCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminId: 1,
          categoryName,
        }),
      });

      const data = await res.json();

      if (data.responseCode === 200) {
        toast.success(data.responseMessage);
        setCategoryName(""); // clear input
      } else {
        toast.error(data.responseMessage || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <ToastContainer />

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add New Category
        </h2>

        {/* Form */}
        <form onSubmit={handleAddCategory} className="space-y-5">
          <div>
            <label className="block mb-2 text-gray-700 font-medium">
              Category Name
            </label>
            <input
              type="text"
              placeholder="Enter category name..."
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-lg font-semibold rounded-lg text-white transition-all shadow-md
              ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Adding...</span>
              </div>
            ) : (
              "Add Category"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
