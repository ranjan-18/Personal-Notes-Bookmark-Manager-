import { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../services/noteService';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import Modal from '../components/Modal';

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  const loadNotes = async () => {
    try {
      const query = search ? `q=${search}` : '';
      const res = await getNotes(token, query);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (data) => {
    try {
      if (editData) {
        await updateNote(editData._id, data, token);
      } else {
        await createNote(data, token);
      }
      setEditData(null);
      loadNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    await deleteNote(id, token);
    loadNotes();
  };

  useEffect(() => {
    loadNotes();
  }, [search]);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search notes..."
          className="w-full md:w-1/2 border px-4 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Note
        </button>
      </div>

      <div className="flex flex-wrap gap-4 justify-start">
        {notes.map(note => (
          <NoteCard
            key={note._id}
            note={note}
            onEdit={(note) => {
              setEditData(note);
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
        <NoteForm
          onSubmit={handleCreate}
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
