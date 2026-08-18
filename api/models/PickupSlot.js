const mongoose = require("mongoose");

const pickupSlotSchema = new mongoose.Schema(
  {
    date: {
      type: String, 
      required: true,
      unique: true,
    },
    timeSlots: [
      {
        slot: {
          type: String, 
          required: true,
        },
        isAvailable: {
          type: Boolean,
          default: true,
        },
        maxCapacity: {
          type: Number,
          default: 10, 
        },
        bookedCount: {
          type: Number,
          default: 0, 
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PickupSlot", pickupSlotSchema);