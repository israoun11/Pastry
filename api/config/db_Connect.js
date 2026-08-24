const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connString = process.env.MONGO_URI || process.env.DB_URI || "mongodb+srv://isra:isra123@cluster0.bygr3wq.mongodb.net/pastryDB?retryWrites=true&w=majority";
    
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    await mongoose.connect(connString);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};

module.exports = connectDB;