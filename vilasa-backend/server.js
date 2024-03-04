const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./database/connectDB");
const cloudinary = require("cloudinary");

// Load environment variables
dotenv.config({ path: "vilasa-backend/config/config.env" });

// Connect to MongoDB
connectdatabase();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    console.error(`Uncaught Exception: ${err.message}`);
    console.error("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error(`Unhandled Promise Rejection: ${err.message}`);
    console.error("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
});
