import React, { useState, useEffect } from 'react';

export default function NoteForm({ onSubmit, initialData = {}, close }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  // Pre-fill if editing
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
      tags: formattedTags,
    });

    close?.(); // Optional close callback
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-gray-500 max-w-[340px] mx-4 p-6 text-left text-sm rounded-lg border border-gray-300/60 space-y-4"
    >
      <div>
        <label className="font-medium" htmlFor="title">Project Title</label>
        <input
          id="title"
          className="w-full border mt-1.5 border-gray-500/30 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="font-medium" htmlFor="content">Content</label>
        <textarea
          id="content"
          rows="3"
          className="w-full resize-none border mt-1.5 border-gray-500/30 outline-none rounded py-2.5 px-3"
          placeholder="Enter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="font-medium" htmlFor="tags">Tags</label>
        <input
          id="tags"
          className="w-full border mt-1.5 border-gray-500/30 outline-none rounded py-2.5 px-3"
          type="text"
          placeholder="e.g. react, mern, notes"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="my-3 bg-indigo-500 py-2 px-5 rounded text-white font-medium"
        >
          Save
        </button>

        <div className="space-x-0.5">
          {/* Placeholder icon buttons — can be enhanced to add functionality */}
          <button type="button" aria-label="add">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
              <path d="M10 8H8m0 0H6m2 0V6m0 2v2m3.333 4H4.667A2.667 2.667 0 0 1 2 11.333V4.667A2.667 2.667 0 0 1 4.667 2h6.666A2.667 2.667 0 0 1 14 4.667v6.666A2.667 2.667 0 0 1 11.333 14Z" stroke="currentColor" strokeOpacity=".8" strokeLinecap="round"/>
            </svg>
          </button>
          <button type="button" aria-label="addPicture">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
              <path d="M9.51 10.625 8.365 9.49c-.526-.522-.79-.783-1.092-.88a1.33 1.33 0 0 0-.82 0c-.303.097-.566.358-1.092.88l-2.666 2.685m6.815-1.55.228-.226c.537-.532.806-.799 1.114-.896.27-.086.562-.082.831.01.306.104.569.376 1.094.921l.557.566m-3.824-.375 2.637 2.684" stroke="currentColor" strokeOpacity=".8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button type="button" aria-label="notes">
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
              <path d="M2 6h12m-2.667 2.668-6.666-.001m2.222 2.667H4.667m0-9.334v1.333M11.333 2v1.333M4.133 14h7.734c.746 0 1.12 0 1.405-.145a1.34 1.34 0 0 0 .583-.583c.145-.285.145-.659.145-1.405v-6.4c0-.747 0-1.12-.145-1.406a1.33 1.33 0 0 0-.583-.582c-.285-.146-.659-.146-1.405-.146H4.133c-.746 0-1.12 0-1.405.146-.25.127-.455.331-.583.582C2 4.347 2 4.72 2 5.467v6.4c0 .746 0 1.12.145 1.405.128.25.332.455.583.583.285.145.659.145 1.405.145" stroke="currentColor" strokeOpacity=".8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </form>
  );
}
