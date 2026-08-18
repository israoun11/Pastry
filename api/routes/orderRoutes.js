const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const {isAuth} = require("../middleware/passport");

// @route   POST /api/order
// @desc    Create new order with Click & Collect details
// @access  Private
router.post("/", isAuth(), async (req, res) => {
  try {
    const {
      orderItems,
      pickupDate,
      pickupTimeSlot,
      contactPhone,
      subtotal,
      totalAmount,
    } = req.body;

    const items = orderItems || req.user.cart;

    if (!items || items.length === 0) {
      return res.status(400).send({ msg: "No items in order" });
    }

    if (!pickupDate || !pickupTimeSlot) {
      return res.status(400).send({ msg: "Pickup date and time slot are required" });
    }

    const calculatedSubtotal =
      subtotal ||
      items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    const calculatedTotal = totalAmount || calculatedSubtotal;

    const newOrder = new Order({
      user: req.user._id,
      orderItems: items,
      pickupDate,
      pickupTimeSlot,
      contactPhone: contactPhone || "20123456",
      subtotal: calculatedSubtotal,
      totalAmount: calculatedTotal,
    });

    await newOrder.save();

    
    req.user.cart = [];
    await req.user.save();

    res.status(201).send({ msg: "Order created successfully", order: newOrder });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   GET /api/order/myorders
// @desc    Get user orders
// @access  Private
router.get("/myorders", isAuth(), async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
});

module.exports = router;