const express = require("express");
const Expenses = require("../models/Expenses");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/*
 * GET ALL EXPENSES
 */
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expenses.find({
      userId: req.user.id,
    }).sort({ date: -1 });

    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
 * GET SINGLE EXPENSE
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const expense = await Expenses.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
 * ADD EXPENSE
 */
router.post("/", auth, async (req, res) => {
  try {
    const { date, expensesType, amount, comments } = req.body;

    if (!date || !expensesType || !amount) {
      return res.status(400).json({
        message: "Date, expense type and amount are required",
      });
    }

    const expense = new Expenses({
      date,
      expensesType,
      amount,
      comments,
      userId: req.user.id,
    });

    await expense.save();

    res.status(201).json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
 * UPDATE EXPENSE
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const expense = await Expenses.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json(expense);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
 * DELETE EXPENSE
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expenses.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    res.json({
      message: "Expense deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
