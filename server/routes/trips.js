const express = require("express");
const Trip = require("../models/Trip");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

//Get trips - only user trips

router.get("/", auth, async (req, res) => {
  const trips = await Trip.find({ userId: req.user.id });
  res.json(trips);
});

//Add trip

router.post("/", auth, async (req, res) => {
  console.log("Body:", req.body); // ← is the data arriving?
  console.log("User:", req.user);
  const trip = new Trip({
    ...req.body,
    userId: req.user.id,
  });

  await trip.save();
  res.json(trip);
});

//Export

module.exports = router;
