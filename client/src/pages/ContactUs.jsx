import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          overflow: "hidden",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "0",
        }}
      >
        <div
          style={{
            padding: "32px",
            background: "linear-gradient(135deg, #f8fbff 0%, #eef4ff 100%)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#2563eb",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontSize: "12px",
            }}
          >
            Contact us
          </p>
          <h2
            style={{ margin: "8px 0 10px", fontSize: "28px", color: "#111827" }}
          >
            Let’s talk about your rideshare business
          </h2>
          <p
            style={{ lineHeight: 1.7, color: "#6b7280", marginBottom: "20px" }}
          >
            Reach out for support, partnerships, or a quick demo. This is a
            front-end-only contact experience for now.
          </p>

          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
            <textarea
              name="message"
              placeholder="Your message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }}
            />

            <button
              type="submit"
              style={{
                marginTop: "4px",
                padding: "12px 16px",
                border: "none",
                borderRadius: "10px",
                background: "#2563eb",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                boxShadow: "0 6px 16px rgba(37, 99, 235, 0.2)",
              }}
            >
              Send message
            </button>

            {submitted && (
              <p style={{ margin: 0, color: "#059669", fontWeight: 600 }}>
                Thanks! Your demo message has been received.
              </p>
            )}
          </form>
        </div>

        <div
          style={{
            padding: "32px",
            background: "#111827",
            color: "#f9fafb",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: "10px" }}>Need help?</h3>
          <p style={{ lineHeight: 1.7, color: "#d1d5db" }}>
            We’re here to help your team manage rides, incomes, and expenses
            more smoothly.
          </p>
          <div
            style={{
              marginTop: "14px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <div>
              <strong>Email:</strong> support@ridesharebas.com
            </div>
            <div>
              <strong>Phone:</strong> +1 (555) 123-4567
            </div>
            <div>
              <strong>Address:</strong> 123 Demo Street, City Center
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
  background: "#fff",
  boxSizing: "border-box",
};
