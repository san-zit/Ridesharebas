const mongoose = require("mongoose");

const EarningsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  dateFrom: String,
  dateTo: String,
  earningsType: String,
  amount: Number,
  comments: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Earnings", EarningsSchema);
