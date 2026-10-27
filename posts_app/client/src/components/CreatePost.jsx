import { useState, useEffect } from "react";
import axios from "axios";

function CreatePost({ onClose, onPostCreated, addToast }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    if (!image) {
      setError("Please select an image.");
      return;
    }
    if (!caption.trim()) {
      setError("Please write a caption.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("image", image);
      formData.append("caption", caption);

      await axios.post("http://localhost:3000/create-post", formData);

      // Reset form
      setImage(null);
      setCaption("");
      setPreview(null);

      addToast("Post created successfully.", "success");
      onPostCreated();
      onClose();
    } catch (err) {
      console.log("Error creating post:", err);
      setError("Unable to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="text-base font-semibold text-white">Create Post</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white text-xl transition"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* Image Upload */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400 uppercase tracking-wider">
              Image
            </label>
            <label
              className={`group relative flex h-48 w-full cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed transition ${
                preview
                  ? "border-green-700"
                  : "border-gray-700 hover:border-green-700"
              }`}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition group-hover:opacity-100">
                    <span className="text-sm font-medium text-white">Change image</span>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-2xl text-gray-600 mb-2">↑</p>
                  <p className="text-sm font-medium text-gray-400">Upload an image</p>
                  <p className="mt-1 text-xs text-gray-600">JPG, JPEG or PNG</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Caption */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400 uppercase tracking-wider">
              Caption
            </label>
            <textarea
              placeholder="Write something..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
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
              {loading ? "Uploading..." : "Create Post"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default CreatePost;