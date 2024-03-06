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

// Middleware for authentication and authorization
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Routes
router.route('/new').post(isAuthenticatedUser, newOrder); // Place a new order
router.route('/:id').get(isAuthenticatedUser, getSingleOrderDetails); // Get order details by ID
router.route('/myorders').get(isAuthenticatedUser, myOrders); // Get logged-in user's orders
router.route('/admin/all').get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders); // Get all orders (admin only)
router.route('/admin/update/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateOrder); // Update order status (admin only)
router.route('/admin/delete/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder); // Delete an order (admin only)

module.exports = router;
