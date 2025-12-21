import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role; // ROLE_ADMIN or ROLE_USER
  } catch {
    return null;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
