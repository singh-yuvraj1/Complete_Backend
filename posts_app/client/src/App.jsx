import { useEffect, useState, useCallback } from "react";
import axios from "axios";

import Navbar from "./components/Navbar";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import PostCard from "./components/PostCard";
import ImageViewer from "./components/ImageViewer";
import DeleteConfirm from "./components/DeleteConfirm";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

function App() {
  // Data
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);       // post object or null
  const [deletePost, setDeletePost] = useState(null);   // post object or null
  const [viewerImage, setViewerImage] = useState(null); // image URL or null

  // Delete loading
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch posts
  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/posts");
      setPosts(res.data.posts);
    } catch (err) {
      console.log("Error fetching posts:", err);
      addToast("Failed to load posts.", "error");
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Delete post
  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      await axios.delete(`http://localhost:3000/posts/${id}`);
      addToast("Post deleted.", "success");
      setDeletePost(null);
      fetchPosts();
    } catch (err) {
      console.log("Error deleting post:", err);
      addToast("Failed to delete post.", "error");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Navbar */}
      <Navbar onCreateClick={() => setCreateOpen(true)} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">

        {/* Hero / Home section */}
        <section id="home" className="mb-10 border border-gray-800 bg-black px-6 py-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-500">
            Postz
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Share your moments.
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-6 text-gray-400">
            Upload photos, write something, and share it with the community.
          </p>
        </section>

        {/* Posts / Explore section */}
        <section id="explore">

          {/* Section header */}
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">Latest Posts</h2>
              <p className="mt-0.5 text-xs text-gray-500">
                Discover the latest moments shared on Postz
              </p>
            </div>
            <span className="border border-gray-700 px-3 py-1 text-xs text-gray-400">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-48 items-center justify-center border border-gray-800">
              <div className="flex flex-col items-center gap-3">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-700 border-t-green-500" />
                <p className="text-xs text-gray-500">Loading posts...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            /* Empty state */
            <div className="flex min-h-48 flex-col items-center justify-center border border-dashed border-gray-800 text-center px-6">
              <p className="text-sm text-gray-500">No posts yet.</p>
              <button
                onClick={() => setCreateOpen(true)}
                className="mt-3 border border-gray-700 px-4 py-1.5 text-xs text-gray-400 hover:border-green-600 hover:text-green-400 transition"
              >
                + Create the first post
              </button>
            </div>
          ) : (
            /* Posts grid */
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onImageClick={(url) => setViewerImage(url)}
                  onEdit={(p) => setEditPost(p)}
                  onDelete={(p) => setDeletePost(p)}
                />
              ))}
            </div>
          )}
        </section>

        {/* About section */}
        <section id="about" className="mt-16 border border-gray-800 bg-black px-6 py-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-green-500">
            About
          </p>
          <h2 className="text-lg font-semibold text-white">What is Postz?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">
            Postz is a simple image-sharing platform built with{" "}
            <span className="text-gray-300">React</span>,{" "}
            <span className="text-gray-300">Node.js</span>,{" "}
            <span className="text-gray-300">Express</span> and{" "}
            <span className="text-gray-300">MongoDB</span>. Upload your photos,
            write a caption, and share your moments with the community.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["React", "Vite", "Node.js", "Express", "MongoDB", "Cloudinary"].map((tech) => (
              <span
                key={tech}
                className="border border-gray-700 px-3 py-1 text-xs text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

      {/* ── Modals ── */}

      {/* Create Post modal */}
      {createOpen && (
        <CreatePost
          onClose={() => setCreateOpen(false)}
          onPostCreated={fetchPosts}
          addToast={addToast}
        />
      )}

      {/* Edit Post modal */}
      {editPost && (
        <EditPost
          post={editPost}
          onClose={() => setEditPost(null)}
          onPostUpdated={fetchPosts}
          addToast={addToast}
        />
      )}

      {/* Delete confirmation */}
      {deletePost && (
        <DeleteConfirm
          post={deletePost}
          onCancel={() => setDeletePost(null)}
          onConfirm={handleDelete}
          loading={deleteLoading}
        />
      )}

      {/* Image viewer */}
      {viewerImage && (
        <ImageViewer
          imageUrl={viewerImage}
          onClose={() => setViewerImage(null)}
        />
      )}

      {/* Toasts */}
      <Toast toasts={toasts} removeToast={removeToast} />

    </div>
  );
}

export default App;