"use client";
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostBlog = () => {
  const [formData, setFormData] = useState({
    adminId: 1, // Fixed adminId
    title: "",
    content: "",
    excerpt: "",
    focusKeyphrase: "",
    seoKeywords: "",
    seoTitle: "",
    metaDescription: "",
    category: "",
    tags: "",
    writerName: "",
    images: null,
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const data = new FormData();
      for (let key in formData) {
        if (formData[key]) {
          if (key === "tags" || key === "seoKeywords") {
            data.append(
              key,
              JSON.stringify(formData[key].split(",").map((t) => t.trim()))
            );
          } else {
            data.append(key, formData[key]);
          }
        }
      }

      const res = await fetch(
        "https://api2.firststartup.in/admin/createBlog",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (result.responseCode === 200) {
        setResponseMessage(result.responseMessage || "Blog created successfully!");
        setFormData({
          adminId: 1, // keep adminId fixed
          title: "",
          content: "",
          excerpt: "",
          focusKeyphrase: "",
          seoKeywords: "",
          seoTitle: "",
          metaDescription: "",
          category: "",
          tags: "",
          writerName: "",
          images: null,
        });
      } else {
        setResponseMessage(result.responseMessage || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setResponseMessage("Failed to submit blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Post a New Blog
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Share your thoughts and ideas with the world.
        </p>

        {responseMessage && (
          <div className="mb-4 p-3 rounded bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200">
            {responseMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your blog title"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
            />
          </div>

          {/* CKEditor Content */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Content
            </label>
            <CKEditor
              editor={ClassicEditor}
              data={formData.content}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData({ ...formData, content: data });
              }}
            />
          </div>

          {/* Rest of your fields like excerpt, SEO, tags, category, images */}
          {/* ... same as before ... */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Excerpt"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
            />
            <input
              type="text"
              name="focusKeyphrase"
              value={formData.focusKeyphrase}
              onChange={handleChange}
              placeholder="Focus Keyphrase"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
            />
            <input
              type="text"
              name="seoKeywords"
              value={formData.seoKeywords}
              onChange={handleChange}
              placeholder="SEO Keywords (comma-separated)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
            />
            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleChange}
              placeholder="SEO Title"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
            />
            <input
              type="text"
              name="metaDescription"
              value={formData.metaDescription}
              onChange={handleChange}
              placeholder="Meta Description"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
            />
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags (comma-separated)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
            />
            <input
              type="text"
              name="writerName"
              value={formData.writerName}
              onChange={handleChange}
              placeholder="Writer Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white"
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Upload Cover Image
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-700 dark:text-gray-300"
            />
          </div>

          {/* Preview Image */}
          {formData.images && (
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Preview:</p>
              <img
                src={URL.createObjectURL(formData.images)}
                alt="Preview"
                className="rounded-lg max-h-64 object-cover"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all disabled:opacity-50"
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostBlog;
