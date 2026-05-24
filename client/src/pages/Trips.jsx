import { ToastContainer, toast } from "react-toastify";
import api from "../utils/api";
import "../style/trips.css";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Menu,
  LogOut,
  CarTaxiFront,
  Calculator,
  FileChartColumn,
  Phone,
  ArrowLeft,
  Plus,
} from "lucide-react";
import { useState } from "react";

export default function Trips() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    date: "",
    startkm: "",
    endkm: "",
    purpose: "",
  });

  const handleAddTrips = async () => {
    try {
      // const userId = localStorage.getItem("userId");

      await api.post("/trips", form);

      toast.success("Trip Saved!");

      setForm({
        date: "",
        startkm: "",
        endkm: "",
        purpose: "",
      });
    } catch (err) {
      console.log(err.response.data);
      toast.error("Failed!");
    }
  };

  return (
    <div className="add-trip">
      <div className="add-trip-button-section">
        <button
          className="btn-back-to-dashboard"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft size={20} color={"black"} />
          Dashboard
        </button>
      </div>
      <div className="add-trip-section">
        <div className="card-child">
          <h1>Add Trip</h1>

          <input
            value={form.date}
            type="date"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            value={form.startkm}
            type="number"
            placeholder="Start Odometer"
            onChange={(e) => setForm({ ...form, startkm: e.target.value })}
          />
          <input
            value={form.endkm}
            type="number"
            placeholder="End Odometer"
            onChange={(e) => setForm({ ...form, endkm: e.target.value })}
          />

          <select
            className="trip-combo-box"
            value={form.purpose}
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          >
            <option value="">Select Trip Catagory</option>
            <option value="Private">Private</option>
            <option value="Business">Business</option>
          </select>

          <button className="btn" onClick={handleAddTrips}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
