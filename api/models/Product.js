const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/150",
    },
    stock: {
      type: Number,
      default: 50,
    },
    
    servings: {
      type: Number,
      default: 1, 
    },
    noticeHours: {
      type: String,
      default: "24h mini.", 
    },
    allergens: [
      {
        type: String, 
      },
    ],
    mayContainTracesOf: [
      {
        type: String, 
      },
    ],
    availableUntil: {
      type: Date, 
    },
    isHome: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);