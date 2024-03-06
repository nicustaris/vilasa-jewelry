const express = require('express');
const router = express.Router();
const { generateInvoice } = require('../controllers/invoiceController');

// Route to generate invoice for a specific order ID
router.get('/invoices/:orderId', generateInvoice);

module.exports = router;
