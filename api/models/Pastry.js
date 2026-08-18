const mongoose = require("mongoose");

const pastrySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    stock: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pastry", pastrySchema);