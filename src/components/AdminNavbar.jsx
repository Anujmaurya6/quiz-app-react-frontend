import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function AdminNavbar({ pendingCount }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="bg-orange-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Panel</h1>

      <div className="flex gap-6 items-center">
        <NavLink
          to="/admin/dashboard"
          className="hover:underline"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/pending"
          className="hover:underline flex gap-1"
        >
          Pending Posts
          <span className="bg-white text-orange-600 px-2 rounded-full text-sm">
            {pendingCount}
          </span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="bg-white text-orange-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
