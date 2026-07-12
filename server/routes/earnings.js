const express = require("express");
const Earnings = require("../models/Earnings");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/*
 * GET ALL EARNINGS
 */
router.get("/", auth, async (req, res) => {
  try {
    const earnings = await Earnings.find({
      userId: req.user.id,
    }).sort({ dateFrom: -1 });

    res.json(earnings);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
 * GET SINGLE EARNING
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const earning = await Earnings.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!earning) {
      return res.status(404).json({
        message: "Earning not found",
      });
    }

    res.json(earning);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
 * ADD EARNING
 */
router.post("/", auth, async (req, res) => {
  try {
    const { dateFrom, dateTo, earningsType, amount, comments } = req.body;

    if (!dateFrom || !dateTo || !earningsType || !amount) {
      return res.status(400).json({
        message: "Date range, earning type and amount are required",
      });
    }

    const earning = new Earnings({
      dateFrom,
      dateTo,
      earningsType,
      amount,
      comments,
      userId: req.user.id,
    });

    await earning.save();

    res.status(201).json(earning);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
 * UPDATE EARNING
 */
router.put("/:id", auth, async (req, res) => {
  try {
    const earning = await Earnings.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!earning) {
      return res.status(404).json({
        message: "Earning not found",
      });
    }

    res.json(earning);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
 * DELETE EARNING
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const earning = await Earnings.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!earning) {
      return res.status(404).json({
        message: "Earning not found",
      });
    }

    res.json({
      message: "Earning deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
