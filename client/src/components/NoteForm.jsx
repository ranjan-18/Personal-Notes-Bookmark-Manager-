import React, { useState, useEffect } from 'react';

export default function NoteForm({ onSubmit, initialData = {}, close }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  // Populate form fields if editing an existing note
  useEffect(() => {
    if (initialData && typeof initialData === 'object') {
      setTitle(initialData.title ?? '');
      setContent(initialData.content ?? '');
      setTags(Array.isArray(initialData.tags) ? initialData.tags.join(', ') : '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedTags = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    onSubmit({
      title: title.trim(),
      content: content.trim(),
      tags: formattedTags
    });

    close();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        className="w-full border px-4 py-2 rounded h-32 resize-y focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="text"
        className="w-full border px-4 py-2 rounded focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={close}
          className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </form>
  );
}
