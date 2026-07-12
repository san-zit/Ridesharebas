import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    avatar: "",
    currency: "$",
    language: "English",
    dateFormat: "MM/DD/YYYY",
    notifications: true,
    tripReminders: true,
    expenseAlerts: true,
    emailAlerts: true,
    pushNotifications: true,
    darkMode: false,
    defaultDashboard: "trips",
    autoBackup: true,
    importExport: true,
    resetData: false,
    twoFactor: false,
    sessionLogout: false,
    defaultTripType: "Business",
    defaultCategory: "Fuel",
    autoCategorization: true,
    subscriptionPlan: "Free",
    billingHistory: true,
    autoSaveDrafts: true,
    soundEffects: true,
    hapticFeedback: false,
  });
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedSettings = localStorage.getItem("settings");
    const storedName = localStorage.getItem("uname") || "";

    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setForm((prev) => ({
          ...prev,
          ...parsed,
          name: parsed.name || storedName,
        }));
      } catch {
        setForm((prev) => ({ ...prev, name: storedName }));
      }
    } else {
      setForm((prev) => ({ ...prev, name: storedName }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem("settings", JSON.stringify(form));
    localStorage.setItem("uname", form.name || "User");
    setSavedMessage("Settings saved successfully.");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <button
          type="button"
          onClick={() =>
            navigate("/dashboard", { state: { activePage: "trips" } })
          }
          style={styles.backButton}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <h2 style={styles.title}>Settings</h2>
        <p style={styles.subtitle}>Manage your account preferences.</p>

        <form onSubmit={handleSave} style={styles.form}>
          <label style={styles.label}>
            Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Phone
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Avatar URL
            <input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            Currency
            <select
              name="currency"
              value={form.currency}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
            </select>
          </label>

          <label style={styles.label}>
            Language
            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="Arabic">Arabic</option>
            </select>
          </label>

          <label style={styles.label}>
            Date Format
            <select
              name="dateFormat"
              value={form.dateFormat}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </label>

          <label style={styles.label}>
            Default Dashboard
            <select
              name="defaultDashboard"
              value={form.defaultDashboard}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="trips">Trips</option>
              <option value="earnings">Earnings</option>
              <option value="expenses">Expenses</option>
              <option value="reports">Reports</option>
            </select>
          </label>

          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>Notifications</h3>
            <label style={styles.checkboxRow}>
              <input
                name="notifications"
                type="checkbox"
                checked={form.notifications}
                onChange={handleChange}
              />
              <span>Enable notifications</span>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="tripReminders"
                type="checkbox"
                checked={form.tripReminders}
                onChange={handleChange}
              />
              <span>Trip reminders</span>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="expenseAlerts"
                type="checkbox"
                checked={form.expenseAlerts}
                onChange={handleChange}
              />
              <span>Expense or earning alerts</span>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="emailAlerts"
                type="checkbox"
                checked={form.emailAlerts}
                onChange={handleChange}
              />
              <span>Email alerts</span>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="pushNotifications"
                type="checkbox"
                checked={form.pushNotifications}
                onChange={handleChange}
              />
              <span>Push notifications</span>
            </label>
          </div>

          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>Appearance</h3>
            <label style={styles.checkboxRow}>
              <input
                name="darkMode"
                type="checkbox"
                checked={form.darkMode}
                onChange={handleChange}
              />
              <span>Dark mode</span>
            </label>
          </div>

          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>Data Management</h3>
            <label style={styles.checkboxRow}>
              <input
                name="autoBackup"
                type="checkbox"
                checked={form.autoBackup}
                onChange={handleChange}
              />
              <span>Auto backup data</span>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="importExport"
                type="checkbox"
                checked={form.importExport}
                onChange={handleChange}
              />
              <span>Allow export/import data</span>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="resetData"
                type="checkbox"
                checked={form.resetData}
                onChange={handleChange}
              />
              <span>Enable reset data option</span>
            </label>
          </div>

          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>Security</h3>
            <label style={styles.checkboxRow}>
              <input
                name="twoFactor"
                type="checkbox"
                checked={form.twoFactor}
                onChange={handleChange}
              />
              <span>Enable two-factor authentication</span>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="sessionLogout"
                type="checkbox"
                checked={form.sessionLogout}
                onChange={handleChange}
              />
              <span>Logout from other devices</span>
            </label>
          </div>

          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>Business Settings</h3>
            <label style={styles.label}>
              Default Trip Type
              <select
                name="defaultTripType"
                value={form.defaultTripType}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Business">Business</option>
                <option value="Personal">Personal</option>
              </select>
            </label>
            <label style={styles.label}>
              Default Category
              <select
                name="defaultCategory"
                value={form.defaultCategory}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Fuel">Fuel</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Food">Food</option>
              </select>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="autoCategorization"
                type="checkbox"
                checked={form.autoCategorization}
                onChange={handleChange}
              />
              <span>Auto-categorization rules</span>
            </label>
          </div>

          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>Account & Billing</h3>
            <label style={styles.label}>
              Subscription Plan
              <select
                name="subscriptionPlan"
                value={form.subscriptionPlan}
                onChange={handleChange}
                style={styles.input}
              >
                <option value="Free">Free</option>
                <option value="Pro">Pro</option>
                <option value="Business">Business</option>
              </select>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="billingHistory"
                type="checkbox"
                checked={form.billingHistory}
                onChange={handleChange}
              />
              <span>Show billing history</span>
            </label>
          </div>

          <div style={styles.sectionCard}>
            <h3 style={styles.sectionTitle}>App Behavior</h3>
            <label style={styles.checkboxRow}>
              <input
                name="autoSaveDrafts"
                type="checkbox"
                checked={form.autoSaveDrafts}
                onChange={handleChange}
              />
              <span>Auto-save drafts</span>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="soundEffects"
                type="checkbox"
                checked={form.soundEffects}
                onChange={handleChange}
              />
              <span>Sound effects</span>
            </label>
            <label style={styles.checkboxRow}>
              <input
                name="hapticFeedback"
                type="checkbox"
                checked={form.hapticFeedback}
                onChange={handleChange}
              />
              <span>Haptic feedback</span>
            </label>
          </div>

          <button type="submit" style={styles.saveButton}>
            <Save size={18} />
            Save Settings
          </button>

          {savedMessage ? <p style={styles.success}>{savedMessage}</p> : null}
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100%",
    padding: "24px",
    background: "linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)",
  },
  card: {
    maxWidth: "720px",
    margin: "0 auto",
    padding: "24px",
    borderRadius: "20px",
    background: "white",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
  },
  backButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    background: "transparent",
    color: "#111827",
    fontWeight: 600,
    cursor: "pointer",
    padding: 0,
  },
  title: {
    margin: "16px 0 4px",
    fontSize: "24px",
    color: "#111827",
  },
  subtitle: {
    margin: "0 0 18px",
    color: "#64748b",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  label: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    fontWeight: 600,
    color: "#0f172a",
  },
  input: {
    padding: "10px 12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
  },
  checkboxRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#334155",
    fontWeight: 500,
  },
  sectionCard: {
    padding: "14px",
    borderRadius: "12px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    margin: "0 0 10px",
    fontSize: "16px",
    color: "#111827",
  },
  saveButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "8px",
    padding: "10px 14px",
    border: "none",
    borderRadius: "10px",
    background: "#111827",
    color: "white",
    cursor: "pointer",
    width: "fit-content",
  },
  success: {
    margin: 0,
    color: "#15803d",
    fontWeight: 600,
  },
};
