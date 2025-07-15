import React, { useEffect, useState } from 'react';
import { getBookmarks } from '../services/bookmarkService'; // ✅ Axios call from service
import { Link } from 'react-router-dom';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    try {
      const data = await getBookmarks();
      setBookmarks(data || []);
    } catch (err) {
      console.error('❌ Failed to load bookmarks:', err);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">📑 Your Bookmarks</h1>
          <Link
            to="/notes"
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full transition"
          >
            ← Back to Notes
          </Link>
        </div>

        {/* Bookmark Grid */}
        {bookmarks.length === 0 ? (
          <p className="text-gray-500 text-center">No bookmarks saved yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bm) => (
              <div
                key={bm._id}
                className="bg-white shadow-sm border border-gray-100 rounded-xl p-5 hover:shadow-md transition"
              >
                <a
                  href={bm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline block mb-2"
                >
                  {bm.title || bm.url}
                </a>

                {bm.description && (
                  <p className="text-sm text-gray-600 mb-2">{bm.description}</p>
                )}

                <div className="flex flex-wrap gap-2">
                  {bm.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
