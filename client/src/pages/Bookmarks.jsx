import { useEffect, useState } from 'react';
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark } from '../services/bookmarkService';
import BookmarkCard from '../components/BookmarkCard';
import BookmarkForm from '../components/BookmarkForm';
import Modal from '../components/Modal';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  const loadBookmarks = async () => {
    try {
      const query = search ? `q=${search}` : '';
      const res = await getBookmarks(token, query);
      setBookmarks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (data) => {
    try {
      if (editData) {
        await updateBookmark(editData._id, data, token);
      } else {
        await createBookmark(data, token);
      }
      setEditData(null);
      loadBookmarks();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await deleteBookmark(id, token);
    loadBookmarks();
  };

  useEffect(() => {
    loadBookmarks();
  }, [search]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search bookmarks..."
          className="w-full md:w-1/2 border px-4 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Bookmark
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-start">
        {bookmarks.map(bookmark => (
          <BookmarkCard
            key={bookmark._id}
            bookmark={bookmark}
            onEdit={(data) => {
              setEditData(data);
              setModalOpen(true);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={() => {
        setModalOpen(false);
        setEditData(null);
      }}>
        <BookmarkForm
          onSubmit={handleSave}
          initialData={editData}
          close={() => {
            setModalOpen(false);
            setEditData(null);
          }}
        />
      </Modal>
    </div>
  );
}
