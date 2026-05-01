import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg"
import image from "../assets/theme.png"

export default function Dashboard() {
    const navigate = useNavigate();
 const logout = () => {
   localStorage.removeItem("token");
   navigate("/");
 };

  return (
    <div style={styles.container}>
      <h1>📊 Dashboard</h1>

      <div style={styles.grid}>
        <Link to="/trips" style={styles.card}>
          🚗 Trip Logbook
        </Link>
        <Link to="/expenses" style={styles.card}>
          💰 Expenses
        </Link>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

const styles = {
  container: { padding: 20 },
  grid: { display: "flex", gap: 20 },
  card: {
    padding: 20,
    background: "#0f172a",
    color: "white",
    borderRadius: 10,
    textDecoration: "none",
  },
};
