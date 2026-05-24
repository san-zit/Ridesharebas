import { useNavigate } from "react-router-dom";
import "../style/dashboard.css";
import DateTime from "../utils/DateTime.jsx";
import logo from "../assets/logo-main.png";
import DashboardTrips from "../components/DashboardTrips";
import {
  Settings,
  Menu,
  LogOut,
  CarTaxiFront,
  Calculator,
  FileChartColumn,
  Phone,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const uname = localStorage.getItem("uname");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uname");
    navigate("/");
  };

  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="dashboard">
      {/* ✅ overlay (NEW) */}
      {open && <div className="overlay" onClick={toggleSidebar}></div>}

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="logo-main">
          <img src={logo} className="logo" alt="logo" />
        </div>
        <ul>
          <li>
            <button
              className="btn-dashboard"
              onClick={() => navigate("/trips")}
            >
              <CarTaxiFront color="white" size={20} />
              Trips
            </button>
          </li>

          <li>
            <button className="btn-dashboard">
              <Calculator color="white" size={20} />
              Expenses
            </button>
          </li>

          <li>
            <button className="btn-dashboard">
              <FileChartColumn color="white" size={20} />
              Reports
            </button>
          </li>

          <li>
            <button className="btn-dashboard">
              <Settings color="white" size={20} />
              Settings
            </button>
          </li>

          <li>
            <button className="btn-dashboard">
              <Phone color="white" size={20} />
              Contact us
            </button>
          </li>
        </ul>
      </div>

      <div className="nav-dash">
        <div className={`navbar ${open ? "shift" : ""}`}>
          {/* ✅ hamburger */}
          <button className="menu-btn" onClick={toggleSidebar}>
            <Menu size={28} />
          </button>

          <h3>
            <span className="dashboard-uname">{uname}</span>
          </h3>

          <div className="dateitime">
            <DateTime />
          </div>

          <button onClick={logout} className="btn-dashboard">
            <LogOut color="white" size={20} />
            Logout
          </button>
        </div>

        <div className="dashboard-hero">
         <DashboardTrips/>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}


//         <Link to="/expenses" style={styles.card}>
//           💰 Expenses
//         </Link>
