import { useState, useEffect } from 'react';

export default function NoteForm({ onSubmit, initialData = {}, close }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    setTitle(initialData.title || '');
    setContent(initialData.content || '');
    setTags(initialData.tags?.join(', ') || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, tags: tags.split(',').map(tag => tag.trim()) });
    close();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full border px-4 py-2 rounded"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
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
