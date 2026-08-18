const express = require("express");
const router = express.Router();
const Pastry = require("../models/Pastry");

// @route   POST /api/pastries/add

router.post("/add", async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body;
    const newPastry = new Pastry({ name, description, price, image, stock });
    await newPastry.save();
    res.status(201).send({ msg: "Pastry added successfully", pastry: newPastry });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   GET /api/pastries

router.get("/", async (req, res) => {
  try {
    const pastries = await Pastry.find();
    res.status(200).send({ pastries });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

module.exports = router;