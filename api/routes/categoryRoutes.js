const express = require("express");
const router = express.Router();
const Category = require("../models/Category");

// @route   GET /api/category
// @desc    Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send({ msg: "Categories fetched successfully", categories });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   POST /api/category
// @desc    Create new category
router.post("/", async (req, res) => {
  try {
    const { name, slug, description } = req.body;

    const newCategory = new Category({
      name,
      slug,
      description,
    });

    await newCategory.save();
    res.status(201).send({ msg: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   DELETE /api/category/:id
// @desc    Delete category by ID
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).send({ msg: "Category deleted successfully" });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

module.exports = router;