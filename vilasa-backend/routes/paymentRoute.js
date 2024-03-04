const express = require('express');
const router = express.Router();
const {
    processStripePayment,
    processPaytmPayment,
    paytmResponse,
    getPaymentStatus
} = require('../controllers/paymentController');

// Middleware to protect routes
const { asyncWrapper } = require('../middlewares/asyncWrapper');

// Routes
router.post('/stripe', asyncWrapper(processStripePayment)); // Process payment using Stripe
router.post('/paytm', asyncWrapper(processPaytmPayment)); // Process payment using Paytm
router.post('/paytm/callback', paytmResponse); // Handle Paytm callback response
router.get('/status/:id', asyncWrapper(getPaymentStatus)); // Get payment status by order ID

module.exports = router;
