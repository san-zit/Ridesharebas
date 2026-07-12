import { useNavigate } from "react-router-dom";
import { ArrowLeft, Eraser } from "lucide-react";
import { useState } from "react";
import { validateEarningForm } from "../utils/validateEarningForm";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useLocation } from "react-router-dom";

export default function Earnings() {
  const navigate = useNavigate();
  const location = useLocation();

  const earning = location.state?.earning;
  const isEdit = location.state?.isEdit;

  const [form, setForm] = useState({
    dateFrom: earning?.dateFrom?.split("T")[0] || "",
    dateTo: earning?.dateTo?.split("T")[0] || "",
    earningsType: earning?.earningsType || "",
    amount: earning?.amount || "",
    comments: earning?.comments || "",
  });

  const earningsList = [
    { value: "uber", label: "Uber" },
    { value: "didi", label: "DiDi" },
    { value: "other", label: "Other" },
  ];

  const handleReset = () => {
    setForm({
      dateFrom: "",
      dateTo: "",
      earningsType: "",
      amount: "",
      comments: "",
    });
  };

  const handleAddEarning = async () => {
    if (!validateEarningForm(form)) return;

    try {
      if (isEdit) {
        await api.put(`/earnings/${earning._id}`, form);
        toast.success("Earning updated successfully");
        handleReset();
        navigate("/dashboard", { state: { activePage: "earnings" } });
        return;
      }

      await api.post("/earnings", form);
      handleReset();
      toast.success("Earning saved successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to save earning - from frontend",
      );
    }
  };

  return (
    <div className="add-trip">
      <div className="add-trip-button-section">
        <button
          className="btn-back-to-dashboard"
          onClick={() =>
            navigate("/dashboard", { state: { activePage: "earnings" } })
          }
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
          <h1>{isEdit ? "Update Earning" : "Add Earning"}</h1>

          <label>Date From*</label>
          <input
            value={form.dateFrom}
            type="date"
            onChange={(e) => setForm({ ...form, dateFrom: e.target.value })}
          />

          <label>Date To*</label>
          <input
            value={form.dateTo}
            type="date"
            onChange={(e) => setForm({ ...form, dateTo: e.target.value })}
          />

          <select
            className="trip-combo-box"
            value={form.earningsType}
            onChange={(e) => setForm({ ...form, earningsType: e.target.value })}
          >
            <option value="">Select Earnings *</option>
            {earningsList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <input
            value={form.amount}
            type="number"
            placeholder="Amount*"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <textarea
            className="text_area_expenses"
            value={form.comments}
            name="description"
            rows="3"
            cols="50"
            placeholder="Comments (optional)"
            onChange={(e) => setForm({ ...form, comments: e.target.value })}
          />

          <button className="btn" onClick={handleAddEarning}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
