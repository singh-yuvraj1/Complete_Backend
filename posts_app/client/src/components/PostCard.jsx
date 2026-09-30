function PostCard({ post }) {

  return (

    <article className="post-card">

      <img
        src={post.image_url}
        alt={post.caption || "Post"}
        className="post-image"
      />

      <div className="post-content">

        <p className="caption">
          {post.caption}
        </p>

        <div className="post-actions">

          <button>❤️</button>
          <button>💬</button>
          <button>↗️</button>

        </div>

      </div>

    </article>

  );
}

export default PostCard;