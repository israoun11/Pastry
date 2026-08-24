const mongoose = require("mongoose");

const connectDB = async () => {
  try {
   

    await mongoose.connect("mongodb+srv://isra:isra123@cluster0.bygr3wq.mongodb.net/isra'sproject");
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = connectDB;