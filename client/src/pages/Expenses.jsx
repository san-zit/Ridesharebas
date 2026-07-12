import { Settings, Eraser, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { validateExpenseForm } from "../utils/validateExpenseForm";
import { toast } from "react-toastify";
import api from "../utils/api";
import { useLocation } from "react-router-dom";

export default function Expenses() {
  const navigate = useNavigate();

  const location = useLocation();

  const expenses = location.state?.expenses;
  const isEdit = location.state?.isEdit;

  const [form, setForm] = useState({
    date: expenses?.date?.split("T")[0] || "",
    expensesType: expenses?.expensesType || "",
    amount: expenses?.amount || "",
    comments: expenses?.comments || "",
  });
  const expensesList = [
    { value: "fule", label: "Fule" },
    { value: "evPublicCharging", label: "EV Charging" },
    { value: "insurance", label: "Insurance & MAI/CTP Green Slip" },
    { value: "registration", label: "Registration" },
    { value: "repairsMaintenance", label: "Repairs & Maintenance" },
    { value: "cleaing", label: "Cleaning" },
    {
      value: "accessories & others",
      label: "Accessories & Others (car seat cover, mat, dashcam etc)",
    },
    { value: "accountancy", label: "Accountant Fees" },
    {
      value: "equipment",
      label: "Equipments (vaccum cleaner, child seat, first aid etc)",
    },
    { value: "phoneBills", label: "Mobile Phone Bills" },
    {
      value: "phoneAndAccessories",
      label: "Mobile Phone Purchases and Accessories",
    },
    {
      value: "musicSubscription",
      label: "Music Subscription (spotify, YT music etc)",
    },
    { value: "parking", label: "Parking" },
    { value: "riderSupplies", label: "Rider Supplies" },
    { value: "hygieneStuff", label: "Sanitiser, Hygiene and Masks" },
    { value: "sunglasses", label: "Sunglasses" },
    { value: "Tolls", label: "Toll Way-Linkt" },
  ];

  const handleReset = () => {
    setForm({
      date: "",
      expensesType: "",
      amount: "",
      comments: "",
    });
  };
  const handleAddExpenses = async () => {
    if (!validateExpenseForm(form)) return;

    try {
      if (isEdit) {
        await api.put(`/expenses/${expenses._id}`, form);

        toast.success("Expenses Updated!");
        handleReset();
        navigate("/dashboard", { state: { activePage: "expenses" } });
        return;
      }
      await api.post("/expenses", form);
      handleReset();
      toast.success("Expense saved successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save expense");
    }
  };

  return (
    <div className="add-trip">
      <div className="add-trip-button-section">
        <button
          className="btn-back-to-dashboard"
          onClick={() =>
            navigate("/dashboard", { state: { activePage: "expenses" } })
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
          <h1>{isEdit ? "Update Trip" : "Add Expenses"}</h1>

          <input
            value={form.date}
            type="date"
            placeholder=""
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <select
            className="trip-combo-box"
            value={form.expensesType}
            onChange={(e) => setForm({ ...form, expensesType: e.target.value })}
          >
            <option value="">Select Expenses *</option>
            {expensesList.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <input
            value={form.amount}
            type="number"
            placeholder="Amount"
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
          />

          <textarea
            className="text_area_expenses" //css is inside login.css
            value={form.comments}
            name="description"
            rows="3"
            cols="50"
            placeholder="Comments(optonal)"
            onChange={(e) => setForm({ ...form, comments: e.target.value })}
          />
          <button className="btn" onClick={handleAddExpenses}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
