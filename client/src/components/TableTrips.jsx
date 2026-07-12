import React, { useState, useEffect } from "react";
import { UserPen, Trash2 } from "lucide-react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function TableTrips() {
  const [trips, setTrips] = useState([]);

  const navigate = useNavigate();
  const handleEdit = (trip) => {
    navigate("/trips", {
      state: {
        trip,
        isEdit: true,
      },
    });
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/trips/${id}`);

      setTrips((prev) => prev.filter((trip) => trip._id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await api.get("/trips");
        setTrips(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTrips();
  }, []);

  return (
   
      <div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Start KM</th>
              <th>End KM</th>
              <th>Distance</th>
              <th>Purpose</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trips.map((trip) => (
              <tr key={trip._id}>
                <td>{new Date(trip.date).toLocaleDateString()}</td>
                <td>{trip.startkm}</td>
                <td>{trip.endkm}</td>
                <td>{trip.endkm - trip.startkm}</td>
                <td>{trip.purpose}</td>
                <td>
                  <div className="btn-group">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(trip)}
                    >
                      <UserPen />
                    </button>

                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(trip._id)}
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
    
  );
}

export default TableTrips;
