const express = require('express');
const router = express.Router();
const {
    processStripePayment,
    processPaytmPayment,
    paytmResponse,
    getPaymentStatus
} = require('../controllers/paymentController');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Routes for payment processing
router.route('/stripe')
    .post(isAuthenticatedUser, authorizeRoles('user'), processStripePayment); // Process payment using Stripe

router.route('/paytm')
    .post(isAuthenticatedUser, authorizeRoles('user'), processPaytmPayment); // Process payment using Paytm

router.post('/paytm/callback', paytmResponse); // Handle Paytm callback response

router.route('/status/:id')
    .get(isAuthenticatedUser, authorizeRoles('user'), getPaymentStatus); // Get payment status by order ID

module.exports = router;
