import { useEffect } from "react";

function DeleteConfirm({ post, onCancel, onConfirm, loading }) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm border border-gray-700 bg-[#0f0f0f] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-base font-semibold text-white">Delete Post?</h3>
        <p className="mt-2 text-sm text-gray-400">
          Are you sure you want to delete this post? This action cannot be undone.
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-700 bg-transparent px-4 py-2 text-sm text-gray-300 hover:border-gray-500 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(post._id)}
            disabled={loading}
            className="flex-1 bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirm;
