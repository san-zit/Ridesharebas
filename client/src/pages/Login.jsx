import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import image from "../assets/theme.png";
import api from "../utils/api";
import "../style/login.css";
import { validateLogin } from "../utils/validateLogin";
import { ToastContainer, toast } from "react-toastify";
import logo from "../assets/logo-main.png";

export default function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const error = validateLogin(form);

      if (Object.keys(error).length > 0) {
        toast.error(Object.values(error)[0]);
        return;
      }
      const res = await api.post("/auth/login", form);
      localStorage.setItem("userId", res.data._id);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("uname", res.data.name);
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login Failed!");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="container">
      {/* <div>
        <img src={logo} className="logo" alt="logo" />
      </div> */}
      {/* LEFT FORM */}
      <div className="card">
        <form className="card-child" onSubmit={handleFormSubmit}>
          <h1>Sign in</h1>

          <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="btn" type="submit" onClick={handleLogin}>
            Login
          </button>

          <p>
            New user? <Link to="/register">Register now</Link>
          </p>
        </form>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="container-right">
        <img src={image} alt="theme" />
      </div>
    </div>
  );
}
