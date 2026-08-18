const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Category = require("../models/Category");


// @route   GET /api/product
// @desc    Get all products
// @access  Public
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");
    res.status(200).send({ msg: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   GET /api/product/:id
// @desc    Get product by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return res.status(404).send({ msg: "Product not found" });
    res.status(200).send({ msg: "Product fetched", product });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   POST /api/product/add
// @desc    Add new product
// @access  Private / Admin
router.post("/add", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      stock,
      servings,
      noticeHours,
      allergens,
      mayContainTracesOf,
      availableUntil,
    } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      stock,
      servings,
      noticeHours,
      allergens,
      mayContainTracesOf,
      availableUntil,
    });

    await newProduct.save();
    res.status(201).send({ msg: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   GET /api/product/category/:categorySlug
// @desc    Get products by category slug (e.g. /category/drinks or /category/pastries)
// @access  Public
router.get("/category/:categorySlug", async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.categorySlug });
    if (!category) {
      return res.status(404).send({ msg: "Category not found" });
    }

    const products = await Product.find({ category: category._id }).populate("category", "name slug");
    res.status(200).send({ msg: "Products fetched by category", products });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

module.exports = router;