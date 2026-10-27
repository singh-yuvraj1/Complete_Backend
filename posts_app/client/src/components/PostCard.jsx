import { useState, useRef, useEffect } from "react";

function PostCard({ post, onImageClick, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <article className="border border-gray-800 bg-[#0f0f0f]">

      {/* Image area */}
      <div className="relative overflow-hidden bg-black">
        <img
          src={post.image_url}
          alt={post.caption || "Post image"}
          className="aspect-square w-full cursor-pointer object-cover transition duration-200 hover:opacity-90"
          onClick={() => onImageClick(post.image_url)}
        />

        {/* Three-dot menu trigger */}
        <div ref={menuRef} className="absolute right-2 top-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((prev) => !prev);
            }}
            className="flex h-8 w-8 items-center justify-center border border-gray-700 bg-black/80 text-gray-300 text-lg hover:text-white hover:border-gray-500 transition"
            aria-label="Post options"
          >
            ⋮
          </button>

          {/* Dropdown menu */}
          {menuOpen && (
            <div className="absolute right-0 top-9 z-50 w-36 border border-gray-700 bg-black shadow-lg">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onEdit(post);
                }}
                className="block w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-[#1a1a1a] hover:text-white transition"
              >
                Edit Post
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                  onDelete(post);
                }}
                className="block w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-[#1a1a1a] hover:text-red-400 transition"
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post content */}
      <div className="px-4 py-3">

        {/* Caption */}
        <p className="text-sm leading-5 text-gray-300 line-clamp-3">
          {post.caption || "No caption"}
        </p>

        {/* Date */}
        {formattedDate && (
          <p className="mt-2 text-xs text-gray-600">
            {formattedDate}
          </p>
        )}

      </div>

    </article>
  );
}

export default PostCard;