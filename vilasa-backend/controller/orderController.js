const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');

/**
 * @desc    Create a new order
 * @route   POST /api/orders/new
 * @access  Private
 */
exports.newOrder = asyncErrorHandler(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, totalPrice } = req.body;

    const orderExist = await Order.findOne({ paymentInfo });

    if (orderExist) {
        return next(new ErrorHandler("Order Already Placed", 400));
    }

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    await sendEmail({
        email: req.user.email,
        templateId: process.env.SENDGRID_ORDER_TEMPLATEID,
        data: {
            name: req.user.name,
            shippingInfo,
            orderItems,
            totalPrice,
            oid: order._id,
        }
    });

    res.status(201).json({
        success: true,
        order,
    });
});

/**
 * @desc    Get details of a single order
 * @route   GET /api/orders/:id
 * @access  Private
 */
exports.getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

/**
 * @desc    Get logged in user's orders
 * @route   GET /api/orders/myorders
 * @access  Private
 */
exports.myOrders = asyncErrorHandler(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
});

/**
 * @desc    Get all orders (Admin)
 * @route   GET /api/orders/admin/all
 * @access  Private/Admin
 */
exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {
    const orders = await Order.find();

    if (!orders) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
});

/**
 * @desc    Update order status (Admin)
 * @route   PUT /api/orders/admin/update/:id
 * @access  Private/Admin
 */
exports.updateOrder = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Already Delivered", 400));
    }

    if (req.body.status === "Shipped") {
        order.shippedAt = Date.now();
        order.orderItems.forEach(async (i) => {
            await updateStock(i.product, i.quantity)
        });
    }

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

/**
 * @desc    Delete an order (Admin)
 * @route   DELETE /api/orders/admin/delete/:id
 * @access  Private/Admin
 */
exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});

/**
 * @desc    Update stock for products in an order
 * @param   {String} id - Product ID
 * @param   {Number} quantity - Quantity to be updated
 * @returns {Promise<void>}
 */
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}
