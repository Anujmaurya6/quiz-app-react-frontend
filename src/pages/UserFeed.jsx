import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/posts";

export default function UserFeed() {
  const [view, setView] = useState("create");
  const [text, setText] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [otherPosts, setOtherPosts] = useState([]);

  const navigate = useNavigate();

  const authHeader = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  // ================= LOAD DATA =================
  const loadMyPosts = async () => {
    const res = await fetch(`${BASE_URL}/my`, {
      headers: authHeader,
    });
    const data = await res.json();
    setMyPosts(data);
  };

  const loadOtherPosts = async () => {
    const res = await fetch(`${BASE_URL}/others`, {
      headers: authHeader,
    });
    const data = await res.json();
    setOtherPosts(data);
  };

  useEffect(() => {
    if (view === "my") loadMyPosts();
    if (view === "other") loadOtherPosts();
  }, [view]);

  // ================= CREATE POST =================
  const handlePost = async () => {
    if (!text.trim()) {
      alert("❌ Please write something");
      return;
    }

    await fetch(`${BASE_URL}/create`, {
      method: "POST",
      headers: authHeader,
      body: JSON.stringify({ content: text }),
    });

    setText("");
    alert("✅ Post sent to admin for approval");
    loadMyPosts();
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-orange-50">
      {/* ================= NAVBAR ================= */}
      <div className="bg-orange-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">User Panel</h1>

        <div className="space-x-6 font-semibold">
          <button onClick={() => setView("create")}>Create</button>
          <button onClick={() => setView("my")}>My Posts</button>
          <button onClick={() => setView("other")}>Other Posts</button>

          <button
            onClick={logout}
            className="ml-6 bg-white text-orange-600 px-4 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= CREATE ================= */}
      {view === "create" && (
        <div className="p-6 max-w-xl mx-auto">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write something..."
            className="w-full h-32 border rounded-lg p-3"
          />

          <button
            onClick={handlePost}
            className="mt-4 w-full bg-orange-500 text-white py-2 rounded"
          >
            Send to Admin
          </button>
        </div>
      )}

      {/* ================= MY POSTS ================= */}
      {view === "my" && (
        <div className="p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">My Posts</h2>

          {myPosts.length === 0 && (
            <p className="text-gray-500">No posts yet</p>
          )}

          {myPosts.map((post) => (
            <div key={post.id} className="bg-white p-4 mb-3 rounded shadow">
              <p>{post.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()} | {post.status}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ================= OTHER USERS POSTS ================= */}
      {view === "other" && (
        <div className="p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Other Users Posts</h2>

          {otherPosts.length === 0 && (
            <p className="text-gray-500">No approved posts</p>
          )}

          {otherPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 mb-3 rounded shadow"
            >
              {/* 🔥 USER NAME (THIS WAS MISSING) */}
              <p className="text-orange-600 font-semibold">
                @{post.user?.username}
              </p>

              <p className="mt-1">{post.content}</p>

              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
