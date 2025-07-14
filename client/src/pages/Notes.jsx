import React, { useEffect, useState } from 'react';
import { getNotes, createNote, updateNote, deleteNote } from '../services/noteService';
import NoteCard from '../components/NoteCard';
import NoteForm from '../components/NoteForm';
import Modal from '../components/Modal';

export default function Notes() {
  const [notes, setNotes] = useState([]);         // ✅ initialized as []
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  const loadNotes = async () => {
    try {
      const query = search ? `q=${search}` : '';
      const res = await getNotes(token, query);

      console.log('📦 Notes API response:', res); // ✅ log to verify structure

      // ✅ handle both array and { data: [...] } responses
      if (Array.isArray(res)) {
        setNotes(res);
      } else if (Array.isArray(res?.data)) {
        setNotes(res.data);
      } else {
        setNotes([]);
      }
    } catch (err) {
      console.error('❌ Failed to load notes:', err);
      setNotes([]); // fallback
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
    try {
      await deleteNote(id, token);
      loadNotes();
    } catch (err) {
      console.error(err);
    }
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
        {Array.isArray(notes) && notes.length > 0 ? (
          notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={() => {
                setEditData(note);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-gray-500">No notes found.</p>
        )}
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
      >
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
