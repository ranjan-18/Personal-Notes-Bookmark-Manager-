import React from 'react';

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 w-full sm:w-[48%] lg:w-[31%] transition-transform hover:-translate-y-1 hover:shadow-xl border border-gray-100">
      <div className="flex justify-between items-start">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{note.title}</h3>
        <div className="space-x-2 text-base">
          <button
            onClick={() => onEdit(note)}
            className="hover:text-indigo-600 transition"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="hover:text-red-600 transition"
            title="Delete"
          >
            🗑
          </button>
        </div>
      </div>

      <p className="text-gray-600 mt-2 text-sm sm:text-base line-clamp-4">{note.content}</p>

      <div className="flex flex-wrap gap-2 mt-4">
        {note.tags.map((tag, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-indigo-100 text-indigo-600 text-xs font-medium rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
