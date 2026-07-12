const mongoose = require("mongoose");

const ExpensesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  date: String,
  expensesType: String,
  amount: Number,
  comments: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("Expenses", ExpensesSchema);
