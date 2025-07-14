import { useState, useEffect } from 'react';

export default function BookmarkForm({ onSubmit, initialData = {}, close }) {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    setUrl(initialData.url || '');
    setTitle(initialData.title || '');
    setDescription(initialData.description || '');
    setTags(initialData.tags?.join(', ') || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      url,
      title,
      description,
      tags: tags.split(',').map(tag => tag.trim())
    });
    close();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="Bookmark URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        required
      />
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="Title (optional)"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border px-4 py-2 rounded"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={e => setTags(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={close} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancel</button>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Save</button>
      </div>
    </form>
  );
}
