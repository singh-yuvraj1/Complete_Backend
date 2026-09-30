import { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "./components/CreatePost";
import PostCard from "./components/PostCard";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts");

      setPosts(response.data.posts);
    } catch (error) {
      console.log("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="app">

      <Navbar />

      <main className="container">

        <CreatePost onPostCreated={fetchPosts} />

        <section className="posts-section">

          <h2>Latest Posts</h2>

          {loading ? (
            <p className="loading">Loading posts...</p>
          ) : posts.length === 0 ? (
            <p className="empty">No posts available.</p>
          ) : (
            <div className="posts-grid">

              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                />
              ))}

            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default App;