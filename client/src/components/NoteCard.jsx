export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-[48%] lg:w-[32%]">
      <h3 className="text-xl font-bold mb-2">{note.title}</h3>
      <p className="text-gray-600 mb-2">{note.content}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {note.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-600 text-sm rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between text-sm text-blue-600">
        <button onClick={() => onEdit(note)}>✏️ Edit</button>
        <button onClick={() => onDelete(note._id)} className="text-red-600">🗑 Delete</button>
      </div>
    </div>
  );
}
