import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await api.post("/auth/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>🚗 Driver Logbook</h1>

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleLogin} style={styles.btn}>
          Login
        </button>

        <p>
          New user? <Link to="/register">Register now</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
  },
  card: {
    background: "#1e293b",
    padding: 30,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: 300,
  },
  btn: {
    background: "#3b82f6",
    color: "white",
    padding: 10,
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
};
