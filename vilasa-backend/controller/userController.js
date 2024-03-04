// Import required modules and dependencies
const User = require('../models/userModel'); // Import user model
const asyncErrorHandler = require('../middlewares/asyncErrorHandler'); // Import async error handler middleware
const ErrorHandler = require('../utils/errorHandler'); // Import custom error handler
const sendEmail = require('../utils/sendEmail'); // Import send email utility
const crypto = require('crypto'); // Import crypto module for generating hash
const cloudinary = require('cloudinary'); // Import cloudinary for image upload

// Register a new user
exports.registerUser = asyncErrorHandler(async (req, res, next) => {
    const { name, email, password, gender, avatar } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler('User already exists with this email', 400));
    }

    // Upload avatar to Cloudinary
    const avatarUpload = await cloudinary.v2.uploader.upload(avatar, {
        folder: 'avatars',
        width: 150,
        crop: 'scale',
    });

    // Create the new user
    const newUser = await User.create({
        name,
        email,
        password,
        gender,
        avatar: {
            public_id: avatarUpload.public_id,
            url: avatarUpload.secure_url,
        },
    });

    // Send welcome email to the new user
    await sendEmail({
        email: newUser.email,
        subject: 'Welcome to Our Platform!',
        message: `Hello ${newUser.name},\n\nWelcome to our platform. We're excited to have you on board!`,
    });

    // Send response
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: newUser,
    });
});

// Login user
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return next(new ErrorHandler('Please provide email and password', 400));
    }

    // Check if the user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    // Send JWT token to the client
    sendToken(user, 200, res);
});

// Logout user
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    // Clear the JWT cookie
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000), // Expire in 10 seconds
        httpOnly: true,
    });

    // Send response
    res.status(200).json({
        success: true,
        message: 'User logged out successfully',
    });
});

// Forgot password - Send reset token
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists with provided email
    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Generate and hash the reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // Create the reset URL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`;

    // Send the password reset email
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password reset token',
            message,
        });

        // Send response
        res.status(200).json({
            success: true,
            message: 'Password reset token sent to email',
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });

        // Handle email sending error
        return next(new ErrorHandler('Email could not be sent', 500));
    }
});

// Reset password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // Find user by reset token
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHandler('Invalid reset token', 400));
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Send response
    res.status(200).json({
        success: true,
        message: 'Password updated successfully',
    });
});

// Update user details
exports.updateUserProfile = asyncErrorHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
    };

    if (req.file) {
        // Upload avatar to Cloudinary
        const avatarUpload = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'avatars',
            width: 150,
            crop: 'scale',
        });

        fieldsToUpdate.avatar = {
            public_id: avatarUpload.public_id,
            url: avatarUpload.secure_url,
        };
    }

    // Find user by ID and update details
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    // Send response
    res.status(200).json({
        success: true,
        message: 'User profile updated successfully',
        user,
    });
});

// Admin operations

// Get all users (Admin)
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find();

    // Send response
    res.status(200).json({
        success: true,
        count: users.length,
        users,
    });
});

// Get single user by ID (Admin)
exports.getUserById = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler(`User not found with id ${req.params.id}`, 404));
    }

    // Send response
    res.status(200).json({
        success: true,
        user,
    });
});

// Update user details by ID (Admin)
exports.updateUserById = asyncErrorHandler(async (req, res, next) => {
    const fieldsToUpdate = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.params.id, fieldsToUpdate, {
        new: true,
        runValidators: true,
    });

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler(`User not found with id ${req.params.id}`, 404));
    }

    // Send response
    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        user,
    });
});

// Delete user by ID (Admin)
exports.deleteUserById = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    // Check if user exists
    if (!user) {
        return next(new ErrorHandler(`User not found with id ${req.params.id}`, 404));
    }

    // Remove user
    await user.remove();

    // Send response
    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    });
});
