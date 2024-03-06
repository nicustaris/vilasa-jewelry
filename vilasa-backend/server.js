const app = require('./app');
const dotenv = require("dotenv");
const connectdatabase = require("./database/connectdatabase");
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
    // Graceful shutdown
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

// Graceful shutdown on SIGINT signal (Ctrl+C)
process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('Server stopped.');
        process.exit(0);
    });
});

// Log when the server is closed unexpectedly
server.on('close', () => {
    console.log('Server closed unexpectedly.');
});
