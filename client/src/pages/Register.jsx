import { useState } from "react";
import api from "../utils/api";
import { useNavigate, Link } from "react-router-dom";
import "../style/register.css";
import { ToastContainer, toast } from "react-toastify";
import { validateForm } from "../utils/validateForm.js";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleRegister = async () => {
    const error = validateForm(form);

    if (Object.keys(error).length > 0) {
      //console.log(errors); // or show in UI
      toast.error(Object.values(error)[0]); // show first error
      return;
    }
    try {
      const { confirmPassword, ...dataToSend } = form;
      toast
        .promise(api.post("/auth/register", dataToSend), {
          pending: "Registering...",
          success: "Registration Success. Please sign in now.",
          error: "Registration failed",
        })
        .then(() => {
          setTimeout(() => {
            navigate("/");
          }, 3000);
        });
    } catch (err) {
      console.error(err);
      toast.error("Registration Failed!");
    }
  };

  return (
    <div className="container">
      <div className="container-child">
        <h1>Register</h1>

        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          id="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          placeholder="Conform Password"
          type="password"
          id="confirmPassword"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />
        <button className="btn" onClick={handleRegister}>
          Register
        </button>
        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}
