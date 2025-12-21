import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

export default function AdminRoute({ children }) {
  if (!getToken()) return <Navigate to="/login" />;
  if (getRole() !== "ROLE_ADMIN") return <Navigate to="/unauthorized" />;
  return children;
}
