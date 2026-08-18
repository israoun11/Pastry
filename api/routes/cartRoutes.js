const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { isAuth } = require("../middleware/passport");

// @route   GET /api/cart
// @desc    Get user cart
// @access  Private
router.get("/", isAuth(), async (req, res) => {
  try {
    res.status(200).send({ cart: req.user.cart || [] });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   POST /api/cart/add
// @desc    Add item to cart
// @access  Private
router.post("/add", isAuth(), async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).send({ msg: "Product not found" });

    let cart = req.user.cart || [];
    const itemIndex = cart.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart[itemIndex].quantity += quantity || 1;
    } else {
      cart.push({
        product: productId,
        quantity: quantity || 1,
        unitPrice: product.price,
      });
    }

    req.user.cart = cart;
    await req.user.save();
    res.status(200).send({ msg: "Item added to cart", cart: req.user.cart });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   DELETE /api/cart/clear
// @desc    Clear user cart
// @access  Private
router.delete("/clear", isAuth(), async (req, res) => {
  try {
    req.user.cart = [];
    await req.user.save();
    res.status(200).send({ msg: "Cart cleared" });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

module.exports = router;