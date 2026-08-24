const express = require("express");
require('dotenv').config();
const cors = require("cors");
const connectDB = require('./config/db_Connect');
const app = express();

require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

//connect to DB
coonectDB()

// Middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => res.send("Express on Vercel"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/user"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));
app.use("/api/coupon", require("./routes/couponRoutes"));
app.use("/api/pickup-slots", require("./routes/pickupRoutes"));
app.use("/api/drinks", require("./routes/drinksRoutes"));
app.use("/api/pastries", require("./routes/pastryRoutes"));



// Export the app for Vercel Serverless Function 
module.exports = app;