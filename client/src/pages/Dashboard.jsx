import { useNavigate } from "react-router-dom";
import "../style/dashboard.css";
import DateTime from "../utils/DateTime.jsx";
import logo from "../assets/logo-main.png";
import TableExpenses from "../components/TableExpenses";
import DashboardTrips from "../components/DashboardTrips";
import {
  Settings,
  Menu,
  LogOut,
  CarTaxiFront,
  Calculator,
  FileChartColumn,
  Phone,
  DollarSign,
} from "lucide-react";
import { useState } from "react";
import TableEarnings from "../components/TableEarnings";
import Report from "./Report";
import SettingsPage from "./Settings";
import ContactUs from "./ContactUs";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const [activePage, setActivePage] = useState(
    location.state?.activePage || "trips",
  ); //get passed value from each page

  const renderDashboard = () => {
    if (activePage === "trips") {
      return <DashboardTrips />;
    }
    if (activePage === "earnings") {
      return <TableEarnings />;
    }
    if (activePage === "expenses") {
      return <TableExpenses />;
    }
    if (activePage === "reports") {
      return <Report />;
    }
    if (activePage === "settings") {
      return <SettingsPage />;
    }
    if (activePage === "contactus") {
      return <ContactUs />;
    }
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
              onClick={() => setActivePage("trips")}
            >
              <CarTaxiFront color="white" size={20} />
              Trips
            </button>
          </li>
          <li>
            <button
              className="btn-dashboard"
              onClick={() => setActivePage("earnings")}
            >
              <DollarSign color="white" size={20} />
              Earnings
            </button>
          </li>
          <li>
            <button
              className="btn-dashboard"
              onClick={() => setActivePage("expenses")}
            >
              <Calculator color="white" size={20} />
              Expenses
            </button>
          </li>

          <li>
            <button
              className="btn-dashboard"
              onClick={() => setActivePage("reports")}
            >
              <FileChartColumn color="white" size={20} />
              Reports
            </button>
          </li>

          <li>
            <button
              className="btn-dashboard"
              onClick={() => setActivePage("settings")}
            >
              <Settings color="white" size={20} />
              Settings
            </button>
          </li>

          <li>
            <button
              className="btn-dashboard"
              onClick={() => setActivePage("contactus")}
            >
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

          <div className="datetime">
            <DateTime />
          </div>

          <button onClick={logout} className="btn-dashboard">
            <LogOut color="white" size={20} />
            Logout
          </button>
        </div>

        <div className="dashboard-hero">
          {
            //render here
            renderDashboard()
          }
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
}

//         <Link to="/expenses" style={styles.card}>
//           💰 Expenses
//         </Link>
