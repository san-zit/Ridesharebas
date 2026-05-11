import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import image from "../assets/theme.png";
import "../style/dashboard.css";
import DateTime from "../utils/DateTime.jsx";
import {
  Home,
  Settings,
  User,
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
  const [open, setOpen] = useState(true);
  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul>
          <li className="menu-icon">
            <Menu size={35} />
          </li>
          <li>
            <button className="btn-dashboard">
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
        <div className="navbar">
          <h1>
            <span className="dashboard-uname">{uname}</span>
          </h1>
          <div className="dateitime">
          <DateTime /></div>
          <button onClick={logout} className="btn-dashboard">
            <LogOut color="white" size={20} />
            Logout
          </button>
        </div>
        <div className="dashboard-hero"><h1>dashboard</h1></div>
      </div>
    </div>
  );
}

//  <Link to="/trips" style={styles.card}>
//           🚗 Trip Logbook
//         </Link>
//         <Link to="/expenses" style={styles.card}>
//           💰 Expenses
//         </Link>
