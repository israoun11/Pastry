const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon");
const { isAuth } = require("../middleware/passport");

// @route   POST /api/coupon
// @desc    Create coupon (Admin only)
// @access  Private/Admin
router.post("/", isAuth(), async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).send({ msg: "Access denied. Admin only." });
  try {
    const { code, discount, expiresAt } = req.body;
    const newCoupon = new Coupon({ code, discount, expiresAt });
    await newCoupon.save();
    res.status(201).send({ msg: "Coupon created", coupon: newCoupon });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

// @route   POST /api/coupon/validate
// @desc    Validate coupon code
// @access  Private
router.post("/validate", isAuth(), async (req, res) => {
  const { code } = req.body;
  try {
    const coupon = await Coupon.findOne({ code, isActive: true });
    if (!coupon) return res.status(404).send({ msg: "Invalid coupon" });
    if (new Date() > new Date(coupon.expiresAt)) {
      return res.status(400).send({ msg: "Coupon expired" });
    }
    res.status(200).send({ msg: "Coupon applied", discount: coupon.discount });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

module.exports = router;