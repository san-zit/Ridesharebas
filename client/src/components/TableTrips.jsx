import React, { useState, useEffect } from "react";
import { UserPen, Trash2 } from "lucide-react";
import api from "../utils/api";

function TableTrips() {
  const [trips, setTrips] = useState([]);

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
                  <button className="btn-edit">
                    <UserPen />
                  </button>
                  <button className="btn-delete">
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
