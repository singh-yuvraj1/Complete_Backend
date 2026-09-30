import { useState } from "react";
import axios from "axios";

function CreatePost({ onPostCreated }) {

  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // When user selects image
  const handleImageChange = (e) => {

    const selectedImage = e.target.files[0];

    if (!selectedImage) return;

    setImage(selectedImage);

    // Create preview
    setPreview(URL.createObjectURL(selectedImage));
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("image", image);
      formData.append("caption", caption);

      const response = await axios.post(
        "http://localhost:3000/create-post",
        formData
      );

      console.log(response.data);

      alert("Post created successfully!");

      // Clear form
      setImage(null);
      setCaption("");
      setPreview(null);

      // Refresh posts
      onPostCreated();

    } catch (error) {

      console.log("Error creating post:", error);

      alert("Failed to create post");

    } finally {

      setLoading(false);

    }
  };


  return (

    <section className="create-post">

      <h2>Create Post</h2>

      <form onSubmit={handleSubmit}>

        <label className="upload-box">

          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="image-preview"
            />
          ) : (
            <>
              <span className="upload-icon">📷</span>
              <p>Click to select an image</p>
            </>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />

        </label>


        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />


        <button
          type="submit"
          disabled={loading}
        >

          {loading ? "Uploading..." : "Create Post"}

        </button>

      </form>

    </section>

  );
}

export default CreatePost;