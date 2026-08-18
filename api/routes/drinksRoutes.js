const express = require("express");
const router = express.Router();
const Drink = require("../models/Drinks");

// @route   POST /api/drinks/add

router.post("/add", async (req, res) => {
  try {
    const { name, description, price, image, stock } = req.body;
    const newDrink = new Drink({ name, description, price, image, stock });
    await newDrink.save();
    res.status(201).send({ msg: "Drink added successfully", drink: newDrink });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   GET /api/drinks

router.get("/", async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.status(200).send({ drinks });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

module.exports = router;