import React, { useState, useEffect } from "react";
import { UserPen, Trash2 } from "lucide-react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import "../style/trips.css";

function TableExpenses() {
  const [expenses, setExpenses] = useState([]);

  const navigate = useNavigate();
  const handleEdit = (expenses) => {
    navigate("/expenses", {
      state: {
        expenses,
        isEdit: true,
      },
    });
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this expense?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/expenses/${id}`);

      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await api.get("/expenses");
        setExpenses(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchExpenses();
  }, []);
  return (
    <div>
      <div className="table-section-header">
        <h3 className="section-heading">Expenses Table</h3>
      </div>
      <div className="add-button">
        <button className="btn-trips" onClick={() => navigate("/expenses")}>
          <Plus size={20} color={"black"} />
          Add Expense
        </button>
      </div>
      <div className="expenses-table-div">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Title</th>
              <th>Amount</th>
              <th>comments</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expenses) => (
              <tr key={expenses._id}>
                <td>{new Date(expenses.date).toLocaleDateString()}</td>
                <td>{expenses.expensesType}</td>
                <td>{expenses.amount}</td>

                <td>{expenses.comments}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(expenses)}
                    >
                      <UserPen />
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(expenses._id)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default TableExpenses;
