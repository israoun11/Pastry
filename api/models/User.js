const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    isCustom: {
      type: Boolean,
      default: false,
    },
    // Custom cake configuration - only relevant when isCustom is true
    customCake: {
      size: { type: String, default: null },
      flavor: { type: String, default: null },
      filling: { type: String, default: null },
      message: { type: String, default: "" },
      deliveryDate: { type: Date, default: null },
      deliveryTime: { type: String, default: null },
    },
    // Snapshot of the calculated unit price at the time item was added
    unitPrice: {
      type: Number,
      required: true,
    },
  },
  { _id: true, timestamps: true }
);

const addressSchema = new mongoose.Schema(
  {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: { type: String, default: "India" },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ["Customer", "Admin"],
      default: "Customer",
    },
    phone: {
      type: String,
      default: "",
    },
    address: addressSchema,
    cart: [cartItemSchema],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
