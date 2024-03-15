const express = require('express');
const router = express.Router();
const {
    processStripePayment,
    processPaytmPayment,
    paytmResponse,
    processRazorpayPayment,
    razorpayWebhook,
    getPaymentStatus
} = require('../controllers/paymentController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Routes for payment processing
router.route('/stripe')
    .post(isAuthenticatedUser, authorizeRoles('user'), processStripePayment); // Process payment using Stripe

router.route('/paytm')
    .post(isAuthenticatedUser, authorizeRoles('user'), processPaytmPayment); // Process payment using Paytm

router.route('/paytm/callback')
    .post(paytmResponse); // Handle Paytm callback response

router.route('/razorpay')
    .post(isAuthenticatedUser, authorizeRoles('user'), processRazorpayPayment); // Process payment using Razorpay

router.route('/razorpay/webhook')
    .post(isAuthenticatedUser,razorpayWebhook); // Handle Razorpay webhook response

router.route('/status/:id')
    .get(isAuthenticatedUser, authorizeRoles('user'), getPaymentStatus); // Get payment status by order ID

module.exports = router;
