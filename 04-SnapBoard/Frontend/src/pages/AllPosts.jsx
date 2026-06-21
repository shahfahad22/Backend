import { useEffect, useState } from "react";


const API_URL = "https://backend-six-pi-nvpbisu8s9.vercel.app";


function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [deletingId, setDeletingId] = useState(null);


  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      const res = await fetch(`${API_URL}/posts`);
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
      } else {
        setErrorMsg("Could not load posts.");
      }
    } catch (err) {
      setErrorMsg("Server not reachable. Is it running?");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const confirm = window.confirm("Delete this post?");
    if (!confirm) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${API_URL}/delete-post/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((post) => post._id !== id));
      } else {
        alert("Could not delete post.");
      }
    } catch (err) {
      alert("Server error. Try again.");
    } finally {
      setDeletingId(null);
    }
  }

  if (loading) return <p className="loading-text">Loading posts...</p>;
  if (errorMsg) return <p className="msg-error" style={{ margin: "80px auto", maxWidth: 400, textAlign: "center" }}>{errorMsg}</p>;

  if (posts.length === 0) return (
    <div className="all-posts-page">
      <p className="empty-text">No posts yet.</p>
      <p className="empty-sub">Start sharing your world!</p>
    </div>
  );

  return (
    <div className="all-posts-page">
      <h2>Feed</h2>
      <div className="posts-grid">
        {posts.map((post) => (
          <article className="post-card" key={post._id}>
            <div className="post-card-img-wrap">
              <img src={post.image} alt="post" />
            </div>
            <div className="post-card-body">
              <p>{post.caption}</p>
              <div className="post-card-divider">
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(post._id)}
                  disabled={deletingId === post._id}
                >
                  <span className="material-symbols-outlined">delete</span>
                  {deletingId === post._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default AllPosts;