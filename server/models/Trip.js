const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: String,
  startkm: Number,
  endkm: Number,
  distance: String,
  purpose: String,
});

module.exports = mongoose.model("Trip", TripSchema);
