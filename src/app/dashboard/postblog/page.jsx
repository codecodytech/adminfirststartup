"use client";

import React, { useState } from "react";

const PostBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission (API call)
    console.log({ title, content, category, image });
    alert("Blog posted successfully!");
    setTitle("");
    setContent("");
    setCategory("");
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-900 p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-800 shadow-lg rounded-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
          Post a New Blog
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Share your thoughts and ideas with the world.
        </p>

        {/* Blog Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Blog Title */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Blog Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your blog title"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
              required
            />
          </div>

          {/* Blog Content */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white h-48 resize-none"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
              required
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
          </div>

          {/* Upload Image */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Upload Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full text-gray-700 dark:text-gray-300"
            />
          </div>

          {/* Preview Image */}
          {image && (
            <div className="mt-4">
              <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Preview:</p>
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="rounded-lg max-h-64 object-cover"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all"
          >
            Post Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostBlog;
