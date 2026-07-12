console.log("server.js started");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trips");
const expensesRoutes = require("./routes/expenses");
const earningsRoutes = require("./routes/earnings");

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/trips", tripRoutes);
app.use("/expenses", expensesRoutes);
app.use("/earnings", earningsRoutes);
app.get("/", (req, res) => {
  res.send("rideshare API is running...");
});
// console.log("MONGO_URI:", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(process.env.PORT || 5050, () =>
      console.log("🚀 Server running on port", process.env.PORT || 5050)
    );
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });
