const express = require("express");
const router = express.Router();
const PickupSlot = require("../models/PickupSlot");

// @route   GET /api/pickup-slots
// @desc    Get available time slots for a specific date
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { date } = req.query; 
    if (!date) {
      return res.status(400).send({ msg: "Date parameter is required" });
    }

    let slotData = await PickupSlot.findOne({ date });

    
    if (!slotData) {
      slotData = {
        date,
        timeSlots: [
          { slot: "10:00-12:00", isAvailable: true },
          { slot: "12:00-15:00", isAvailable: true },
          { slot: "15:00-17:00", isAvailable: true },
        ],
      };
    }

    res.status(200).send(slotData);
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

module.exports = router;