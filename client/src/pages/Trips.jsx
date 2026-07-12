import { ToastContainer, toast } from "react-toastify";
import { validateTrip } from "../utils/validateTrip";
import api from "../utils/api";
import "../style/trips.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Settings, Eraser, ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function Trips() {
  const navigate = useNavigate();

  const location = useLocation();

  const trip = location.state?.trip;
  const isEdit = location.state?.isEdit;

  const [form, setForm] = useState({
    date: trip?.date?.split("T")[0] || "",
    startkm: trip?.startkm || "",
    endkm: trip?.endkm || "",
    purpose: trip?.purpose || "",
  });
  const handleReset = () => {
    setForm({
      date: "",
      startkm: "",
      endkm: "",
      purpose: "",
    });
    toast.success("Form is cleared.");
    navigate("/trips");
  };
  const handleAddTrips = async () => {
    if (!validateTrip(form)) return;
    try {
      if (isEdit) {
        await api.put(`/trips/${trip._id}`, form);

        toast.success("Trip Updated!");
        handleReset();
        navigate("/dashboard",{ state: { activePage: "trips" } });
        
        return;
      } else {
        await api.post("/trips", form);
        toast.success("Trip Added!");
      }
      setForm({
        date: "",
        startkm: "",
        endkm: "",
        purpose: "",
      });
      // await api.post("/trips", form);

      // toast.success("Trip Saved!");
    } catch (err) {
      // console.log(err.response.data);
      toast.error(err.response.data + "Failed!");
    }
  };

  return (
    <div className="add-trip">
      <div className="add-trip-button-section">
        <button
          className="btn-back-to-dashboard"
          onClick={() => navigate("/dashboard",{ state: { activePage: "trips" } })}
        >
          <ArrowLeft size={20} color={"black"} />
          Dashboard
        </button>
        <button className="btn-reset-form" onClick={handleReset}>
          <Eraser size={20} color={"black"} />
          Reset Form
        </button>
      </div>
      <div className="add-trip-section">
        <div className="card-child">
          <h1>{isEdit ? "Update Trip" : "Add Trip"}</h1>

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
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
