import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserFeed from "../pages/UserFeed";
import AdminDashboard from "../pages/AdminDashboard";
import AdminPending from "../pages/AdminPending";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/user"
        element={
          <PrivateRoute>
            <UserFeed />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/pending"
        element={
          <AdminRoute>
            <AdminPending />
          </AdminRoute>
        }
      />

      <Route path="*" element={<Login />} />
    </Routes>
  );
}
