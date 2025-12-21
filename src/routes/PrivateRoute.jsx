import { Navigate } from "react-router-dom";
import { getToken, getRole } from "../utils/auth";

export default function PrivateRoute({ children }) {
  if (!getToken()) return <Navigate to="/login" />;
  if (getRole() !== "ROLE_USER") return <Navigate to="/unauthorized" />;
  return children;
}
