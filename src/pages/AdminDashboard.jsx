import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getPendingPosts } from "../api/postApi";
import { logout } from "../utils/auth";

export default function AdminDashboard() {
  const [pendingCount, setPendingCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPending = async () => {
      try {
        const posts = await getPendingPosts();
        setPendingCount(posts.length);
      } catch (err) {
        console.error("Failed to load pending posts", err);
      } finally {
        setLoading(false);
      }
    };

    loadPending();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-orange-50">
      {/* ================= NAVBAR ================= */}
      <div className="bg-orange-600 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Panel</h1>

        <div className="flex gap-6 items-center font-semibold">
          <Link
            to="/admin/dashboard"
            className="hover:underline underline-offset-4"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/pending"
            className="hover:underline underline-offset-4"
          >
            Pending Posts
          </Link>

          <button
            onClick={handleLogout}
            className="bg-white text-orange-600 px-4 py-1 rounded-lg font-bold hover:bg-orange-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ================= DASHBOARD ================= */}
      <div className="p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Dashboard Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Pending Posts Card */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Pending Posts
            </h3>

            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <p className="text-4xl font-bold text-orange-600">
                {pendingCount}
              </p>
            )}

            <p className="text-gray-500 mt-2">
              User posts waiting for approval
            </p>

            <button
              onClick={() => navigate("/admin/pending")}
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              Review Posts
            </button>
          </div>

          {/* System Info Card (optional but clean) */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              System Status
            </h3>

            <p className="text-gray-600">
              All moderation actions are handled securely via JWT.
            </p>

            <p className="text-sm text-gray-400 mt-4">
              Admin-only access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
