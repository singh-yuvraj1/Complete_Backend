import { useState, useEffect, useRef } from "react";
import axios from "axios";

function EditPost({ post, onClose, onPostUpdated, addToast }) {
  const [caption, setCaption] = useState(post?.caption || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(post?.image_url || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  // Escape to close
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setImage(selected);
    setPreview(URL.createObjectURL(selected));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!caption.trim()) {
      setError("Caption cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("caption", caption);
      if (image) {
        formData.append("image", image);
      }

      await axios.put(`http://localhost:3000/posts/${post._id}`, formData);

      addToast("Post updated successfully.", "success");
      onPostUpdated();
      onClose();
    } catch (err) {
      console.log("Error updating post:", err);
      setError("Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg border border-gray-700 bg-[#0f0f0f]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 px-5 py-4">
          <h2 className="text-base font-semibold text-white">Edit Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-xl transition"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* Image preview */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400 uppercase tracking-wider">
              Image
            </label>
            <div
              className="relative h-48 w-full overflow-hidden border border-gray-700 cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                    <span className="text-sm text-white font-medium">Change image</span>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-500">
                  Click to select an image
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="mt-1 text-xs text-gray-600">
              Leave unchanged to keep existing image
            </p>
          </div>

          {/* Caption */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400 uppercase tracking-wider">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write something..."
              rows={4}
              className="w-full resize-none border border-gray-700 bg-black px-3 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-green-600 transition"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="border border-red-800 bg-red-950 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-700 bg-transparent px-4 py-2 text-sm text-gray-300 hover:border-gray-500 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 px-4 py-2 text-sm font-semibold text-black hover:bg-green-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditPost;
