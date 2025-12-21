import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setMsg("");
    setError("");

    if (!username || !password) {
      setError("❌ Username and password required");
      return;
    }

    try {
      const token = await loginUser(username, password);

      if (token === "invalid") {
        setError("❌ Invalid credentials");
        return;
      }

      // 🔐 SAVE JWT
      localStorage.setItem("token", token);

      // 🔍 DECODE JWT (ROLE निकालने के लिए)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const role = payload.role; // ROLE_USER / ROLE_ADMIN

      setMsg("✅ Login successful");

      // 🔥 ROLE BASED REDIRECT
if (role === "ROLE_ADMIN") {
  navigate("/admin/dashboard");
} else if (role === "ROLE_USER") {
  navigate("/user");
} else {
  setError("❌ Unknown role");
}


    } catch (err) {
      setError("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="w-[380px] bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
          Welcome Back
        </h2>

        <input
          className="w-full border p-2 rounded mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          First time here?{" "}
          <Link to="/signup" className="text-orange-600 font-semibold">
            Signup first
          </Link>
        </p>

        {msg && <p className="text-center mt-3 text-green-600">{msg}</p>}
        {error && <p className="text-center mt-3 text-red-600">{error}</p>}
      </div>
    </div>
  );
}
