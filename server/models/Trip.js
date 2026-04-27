const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: String,
  startKm: Number,
  endKm: Number,
  from: String,
  to: String,
});

module.exports = mongoose.model("Trip", TripSchema);
