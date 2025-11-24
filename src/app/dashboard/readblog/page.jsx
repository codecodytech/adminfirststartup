"use client";

import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("https://api2.firststartup.in/admin/listBlogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.responseCode === 200) setBlogs(data.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (!mounted) return null;

  // Delete blog via Next.js API proxy
  const handleDeleteBlog = async (blogId) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    setDeleteLoading(true);

    try {
      const res = await fetch(`https://api2.firststartup.in/admin/deleteBlog?blogId=${blogId}`, { method: "DELETE" });
      let data;
      try {
        data = await res.json();
      } catch (err) {
        toast.error("Invalid response from server");
        setDeleteLoading(false);
        return;
      }

      if (data.responseCode === 200) {
        toast.success(data.responseMessage);
        setBlogs((prev) => prev.filter((b) => b._id !== blogId));
        setSelectedBlog(null);
      } else {
        toast.error(data.responseMessage || "Failed to delete blog");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">All Blogs</h1>
      <ToastContainer />

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              onClick={() => setSelectedBlog(blog)}
              className="cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-xl transition"
            >
              <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
              <p className="text-gray-600 text-sm mb-1">
                Author: {blog.writerName || "Unknown"}
              </p>
              <p className="text-gray-500 text-xs">
                Date: {new Date(blog.date).toLocaleDateString("en-US")}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedBlog && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-start overflow-y-auto z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mt-10 relative">
            {/* Buttons */}
            <div className="absolute top-3 right-3 flex space-x-3">
              <button
                onClick={() => setSelectedBlog(null)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 shadow transition-all focus:outline-none"
                title="Close Popup"
              >
                <span className="text-2xl font-bold">×</span>
              </button>

              <button
                onClick={() => handleDeleteBlog(selectedBlog._id)}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-600 text-white shadow transition-all focus:outline-none ${
                  deleteLoading ? "cursor-not-allowed opacity-70" : ""
                }`}
                title="Delete Blog"
                disabled={deleteLoading}
              >
                {deleteLoading ? (
                  <div className="animate-spin border-b-2 border-white rounded-full w-5 h-5"></div>
                ) : (
                  <span className="text-2xl font-bold">🗑</span>
                )}
              </button>

              <button
                onClick={() => console.log("Update Blog")}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow transition-all focus:outline-none"
                title="Update Blog"
              >
                <span className="text-2xl font-bold">✎</span>
              </button>
            </div>

            {/* Blog Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">{selectedBlog.title}</h2>
              <p className="text-gray-600 mb-4">
                Author: {selectedBlog.writerName || "Unknown"} | Date:{" "}
                {new Date(selectedBlog.date).toLocaleDateString("en-US")}
              </p>
              <div className="space-y-4">
                {selectedBlog.content.map((item) => {
                  if (item.type === "paragraph") {
                    return (
                      <p key={item._id} className="text-gray-700">
                        {item.text}
                      </p>
                    );
                  } else if (item.type === "image") {
                    return (
                      <img key={item._id} src={item.text} alt="" className="w-full rounded" />
                    );
                  } else return null;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
