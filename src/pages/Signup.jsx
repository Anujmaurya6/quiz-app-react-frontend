import { useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "../api/authApi";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    setMsg("");
    setError("");

    if (!username || !email || !mobile || !password) {
      setError("❌ All fields are required");
      return;
    }

    try {
      const res = await signupUser({
        username,
        email,
        mobile,
        password,
      });

      if (res.toLowerCase().includes("success")) {
        setMsg("✅ Signup successful. Please login.");
        setUsername("");
        setEmail("");
        setMobile("");
        setPassword("");
      } else {
        setError("❌ " + res);
      }
    } catch {
      setError("❌ Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50">
      <div className="w-[400px] bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-orange-600 text-center mb-6">
          Create Account
        </h2>

        <input className="w-full border p-2 rounded mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input className="w-full border p-2 rounded mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input className="w-full border p-2 rounded mb-3"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <input type="password"
          className="w-full border p-2 rounded mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold"
        >
          Signup
        </button>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already registered?{" "}
          <Link to="/login" className="text-orange-600 font-semibold">
            Login
          </Link>
        </p>

        {msg && <p className="text-center mt-3 text-green-600">{msg}</p>}
        {error && <p className="text-center mt-3 text-red-600">{error}</p>}
      </div>
    </div>
  );
}
