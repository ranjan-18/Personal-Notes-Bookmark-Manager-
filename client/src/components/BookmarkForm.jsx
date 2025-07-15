import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { createBookmark } from '../services/bookmarkService';

export default function BookmarkForm({ onSuccess }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedTags = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);

    try {
      await createBookmark({ url, title, description, tags: formattedTags });
      toast.success('Bookmark added!');
      onSuccess?.();
      setUrl('');
      setTitle('');
      setDescription('');
      setTags('');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add bookmark');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center text-sm text-slate-800"
    >
      <p className="text-xs bg-indigo-200 text-indigo-600 font-medium px-3 py-1 rounded-full">
        Bookmark Manager
      </p>
      <h1 className="text-4xl font-bold py-4 text-center">Add New Bookmark</h1>
      <p className="max-md:text-sm text-gray-500 pb-10 text-center">
        Save your favorite links and organize them with tags.
      </p>

      <div className="max-w-96 w-full px-4">
        {/* URL Input */}
        <label className="font-medium">Bookmark URL *</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="url"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </div>

        {/* Title Input */}
        <label className="font-medium mt-4">Title (optional)</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="text"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <label className="font-medium mt-4">Description</label>
        <textarea
          rows="4"
          className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all"
          placeholder="Enter a short description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* Tags Input */}
        <label className="font-medium mt-4">Tags (comma-separated)</label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="text"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="e.g. react, design, tools"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="flex items-center justify-center gap-1 mt-5 bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 w-full rounded-full transition"
        >
          Save Bookmark
          <svg className="mt-0.5" width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33" fill="#fff"/>
          </svg>
        </button>
      </div>
    </form>
  );
}
