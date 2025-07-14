export default function BookmarkCard({ bookmark, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-full md:w-[48%] lg:w-[32%]">
      <h3 className="text-xl font-bold mb-1 text-blue-700 truncate">{bookmark.title}</h3>
      <a
        href={bookmark.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-500 underline break-all"
      >
        {bookmark.url}
      </a>
      <p className="text-gray-600 mt-2 text-sm">{bookmark.description}</p>
      <div className="flex flex-wrap gap-2 mt-3">
        {bookmark.tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
            #{tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between mt-4 text-sm text-blue-600">
        <button onClick={() => onEdit(bookmark)}>✏️ Edit</button>
        <button onClick={() => onDelete(bookmark._id)} className="text-red-600">🗑 Delete</button>
      </div>
    </div>
  );
}
