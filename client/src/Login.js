import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://mini-crm-backend-nuay.onrender.com";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password
      });

      console.log("Login response:", res.data);

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>
      <div style={overlay}></div>

      <div style={card}>
        <h1 style={logo}>🚀 Mini CRM</h1>
        <h2 style={title}>Welcome Back</h2>

        {error && <p style={errorText}>{error}</p>}

        <div style={inputGroup}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={input}
          />
        </div>

        <div style={inputGroup}>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={input}
          />
          <span style={toggle} onClick={() => setShow(!show)}>
            👁️
          </span>
        </div>

        <button onClick={handleLogin} style={button}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={footer}>Secure access to your CRM dashboard</p>
      </div>
    </div>
  );
}

const container = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
  position: "relative",
  overflow: "hidden"
};

const overlay = {
  position: "absolute",
  width: "100%",
  height: "100%",
  background: "rgba(255,255,255,0.03)",
  backdropFilter: "blur(2px)"
};

const card = {
  position: "relative",
  zIndex: 2,
  width: "380px",
  padding: "40px 30px",
  borderRadius: "24px",
  background: "rgba(255,255,255,0.12)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
  backdropFilter: "blur(20px)",
  textAlign: "center",
  color: "white"
};

const logo = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "10px"
};

const title = {
  fontSize: "1.6rem",
  marginBottom: "25px",
  fontWeight: "600"
};

const errorText = {
  color: "#ff6b6b",
  marginBottom: "15px",
  fontWeight: "500"
};

const inputGroup = {
  position: "relative",
  marginBottom: "18px"
};

const input = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "14px",
  border: "none",
  outline: "none",
  fontSize: "1rem",
  background: "rgba(255,255,255,0.85)",
  color: "#111827",
  boxSizing: "border-box"
};

const toggle = {
  position: "absolute",
  right: "15px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer"
};

const button = {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "2px solid rgba(255,255,255,0.5)",
  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
  color: "white",
  fontSize: "1.1rem",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px"
};

const footer = {
  marginTop: "18px",
  fontSize: "0.95rem",
  color: "rgba(255,255,255,0.8)"
};

export default Login;