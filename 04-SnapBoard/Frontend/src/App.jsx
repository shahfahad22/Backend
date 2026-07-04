import { useState } from "react";
import CreatePost from "./pages/CreatePost";
import AllPosts from "./pages/AllPosts";

function App() {
  const [page, setPage] = useState("create");

  return (
    <>
      <nav className="navbar">
        <h1>📸SnapBoard</h1>
        {page === "create" ? (
          <button onClick={() => setPage("all")}>All Posts →</button>
        ) : (
          <button onClick={() => setPage("create")}>+ Create Post</button>
        )}
      </nav>

      {page === "create" ? <CreatePost /> : <AllPosts />}
    </>
  );
}

export default App;