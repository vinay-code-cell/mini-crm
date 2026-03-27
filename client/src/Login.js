import { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setLoading(true);
    setError("");

    axios.post("http://localhost:5000/api/auth/login", {
      email,
      password
    })
    .then(res => {
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    })
    .catch(() => {
      setError("Invalid email or password ❌");
    })
    .finally(() => setLoading(false));
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
            onChange={e => setEmail(e.target.value)}
            style={input}
          />
        </div>

        <div style={inputGroup}>
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            style={input}
          />
          <span style={toggle} onClick={() => setShow(!show)}>
            {show ? "🙈" : "👁️"}
          </span>
        </div>

        <button style={button} onClick={handleLogin}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={footer}>Secure access to your CRM dashboard</p>
      </div>
    </div>
  );
}

/* 🎨 PREMIUM STYLES */

const container = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #0f172a, #1e293b)",
  position: "relative",
  overflow: "hidden"
};

const overlay = {
  position: "absolute",
  width: "300%",
  height: "300%",
  background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 60%)",
  animation: "spin 20s linear infinite"
};

const card = {
  position: "relative",
  zIndex: 1,
  width: "350px",
  padding: "35px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(20px)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.4)",
  textAlign: "center",
  color: "white"
};

const logo = {
  marginBottom: "10px",
  fontSize: "28px"
};

const title = {
  marginBottom: "20px",
  fontWeight: "500"
};

const inputGroup = {
  position: "relative",
  marginBottom: "15px"
};

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  outline: "none",
  background: "rgba(255,255,255,0.15)",
  color: "white"
};

const toggle = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer"
};

const button = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px",
  transition: "0.3s"
};

const errorText = {
  color: "#f87171",
  fontSize: "14px",
  marginBottom: "10px"
};

const footer = {
  marginTop: "15px",
  fontSize: "12px",
  opacity: 0.7
};

export default Login;
