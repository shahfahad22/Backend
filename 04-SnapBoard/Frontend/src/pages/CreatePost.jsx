import { useState } from "react";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleImageChange(e) {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (!image || !caption.trim()) {
      setErrorMsg("Please add both an image and a caption.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/create-post", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("Post shared successfully!");
        setCaption("");
        setImage(null);
        setPreview(null);
      } else {
        setErrorMsg(data.message || "Something went wrong.");
      }
    } catch (err) {
      setErrorMsg("Could not connect to server. Is it running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="form-card">
        <h2>Share a moment</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Image</label>
            <div className="upload-box">
              <span className="upload-icon material-symbols-outlined">
                cloud_upload
              </span>
              <p>
                Click to browse{" "}
                <span className="highlight">or drop image here</span>
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Caption</label>
            <textarea
              placeholder="Write something..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? "Uploading..." : "+ Share Post"}
          </button>
        </form>

        {successMsg && <div className="msg-success">{successMsg}</div>}
        {errorMsg && <div className="msg-error">{errorMsg}</div>}
      </div>
    </div>
  );
}

export default CreatePost;