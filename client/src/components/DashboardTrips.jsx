import React from "react";
import TableTrips from "./TableTrips";
import "../style/trips.css";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DashboardTrips() {
    const navigate = useNavigate();
  return (
    <div className="trip-component">
      <div className="add-button">
        <button className="btn-trips" onClick={() => navigate("/trips")}>
          <Plus size={20} color={"black"} />
          Add Trip
        </button>
      </div>
      <div className="trips-table">
<TableTrips/>

      </div>
    </div>
  );
}

export default DashboardTrips;
