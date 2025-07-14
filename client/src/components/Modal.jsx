export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-500 text-lg font-bold">×</button>
        {children}
      </div>
    </div>
  );
}
