const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    updateUserProfile,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
} = require('../controllers/authController');
const { asyncErrorHandler } = require('../middlewares/asyncErrorHandler');

// Routes for user authentication and management
router.route('/register')
    .post(asyncErrorHandler(registerUser)); // Register a new user

router.route('/login')
    .post(asyncErrorHandler(loginUser)); // Login user

router.route('/logout')
    .get(asyncErrorHandler(logoutUser)); // Logout user

router.route('/forgotpassword')
    .post(asyncErrorHandler(forgotPassword)); // Forgot password - Send reset token

router.route('/resetpassword/:token')
    .put(asyncErrorHandler(resetPassword)); // Reset password

router.route('/updateprofile')
    .put(asyncErrorHandler(updateUserProfile)); // Update user profile

// Routes for admin operations
router.route('/users')
    .get(asyncErrorHandler(getAllUsers)); // Get all users (Admin)

router.route('/users/:id')
    .get(asyncErrorHandler(getUserById)) // Get single user by ID (Admin)
    .put(asyncErrorHandler(updateUserById)) // Update user details by ID (Admin)
    .delete(asyncErrorHandler(deleteUserById)); // Delete user by ID (Admin)

module.exports = router;
