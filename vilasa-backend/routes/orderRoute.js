const express = require('express');
const router = express.Router();
const {
    newOrder,
    getSingleOrderDetails,
    myOrders,
    getAllOrders,
    updateOrder,
    deleteOrder
} = require('../controllers/orderController');

// Middleware to protect routes
const { protect, authorize } = require('../middlewares/authMiddleware');

// Routes
router.route('/new').post(protect, newOrder); // Place a new order
router.route('/:id').get(protect, getSingleOrderDetails); // Get order details by ID
router.route('/myorders').get(protect, myOrders); // Get logged in user's orders
router.route('/admin/all').get(protect, authorize('admin'), getAllOrders); // Get all orders (admin only)
router.route('/admin/update/:id').put(protect, authorize('admin'), updateOrder); // Update order status (admin only)
router.route('/admin/delete/:id').delete(protect, authorize('admin'), deleteOrder); // Delete an order (admin only)

module.exports = router;
