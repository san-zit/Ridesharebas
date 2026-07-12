import { useState, useEffect } from "react";
import { UserPen, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../style/trips.css";

export default function TableEarnings() {
  const [earnings, setEarnings] = useState([]);
  const navigate = useNavigate();

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    return isNaN(date.getTime()) ? value : date.toLocaleDateString();
  };

  const getEarningLabel = (value) => {
    const labels = {
      uber: "Uber",
      didi: "DiDi",
      other: "Other",
    };
    return labels[value] || value || "-";
  };

  const handleEdit = (earning) => {
    navigate("/earnings", {
      state: {
        earning,
        isEdit: true,
      },
    });
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this earning?",
    );

    if (!confirmed) return;

    try {
      await api.delete(`/earnings/${id}`);
      setEarnings((prev) => prev.filter((earning) => earning._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await api.get("/earnings");
        setEarnings(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div>
      <div className="table-section-header">
        <h3 className="section-heading">Earnings Table</h3>
      </div>
      <div className="add-button">
        <button className="btn-trips" onClick={() => navigate("/earnings")}>
          <Plus size={20} color={"black"} />
          Add Earnings
        </button>
      </div>
      <div className="expenses-table-div">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Income From</th>
              <th>Amount</th>
              <th>Comments</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((earning) => (
              <tr key={earning._id}>
                <td>
                  {formatDate(earning.dateFrom)}
                  {earning.dateTo ? ` - ${formatDate(earning.dateTo)}` : ""}
                </td>
                <td>{getEarningLabel(earning.earningsType)}</td>
                <td>{earning.amount}</td>
                <td>{earning.comments || "-"}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(earning)}
                    >
                      <UserPen />
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(earning._id)}
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
