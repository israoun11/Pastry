const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isAuth } = require("../middleware/passport");

// @route   GET /api/user/current
// @desc    Get current logged in user
// @access  Private
router.get("/current", isAuth(), async (req, res) => {
  try {
    res.status(200).send({ user: req.user });
  } catch (error) {
    res.status(500).send({ msg: "Server error", error: error.message });
  }
});

module.exports = router;