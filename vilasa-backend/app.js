const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload"); // Middleware for handling file uploads
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });

// Importing routes
const user = require("./route/userRoute");
const order = require("./route/orderRoute");
const product = require("./route/productRoute");
const payment = require("./route/paymentRoute");

// Middleware setup
app.use(cookieParser()); // Middleware for parsing cookies
app.use(express.json()); // Middleware for parsing JSON bodies
app.use(bodyParser.json({ limit: "50mb" })); // Middleware for parsing JSON with a size limit
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // Middleware for parsing URL-encoded data with a size limit
app.use(fileUpload()); // Middleware for handling file uploads
app.use(errorMiddleware); // Custom error handling middleware
app.use(cors()); // Middleware for enabling CORS

// Route setup
app.use("/api/v1/product", product); // Product routes
app.use("/api/v1/user", user); // User routes
app.use("/api/v1/order", order); // Order routes
app.use("/api/v1/payment", payment); // Payment routes

// Serve static files from the frontend build directory
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, "/frontend/build")));

// Serve the React app for any other routes
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
);

module.exports = app;
