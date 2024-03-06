const Order = require('../model/orderModel');
const Product = require('../model/productModel');

// Controller method to generate product buy invoice for admin
exports.generateInvoice = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;

    // Retrieve the order details from the database
    const order = await Order.findById(orderId).populate({
      path: 'orderItems.productId',
      select: 'name price description category brand', // Include additional product details
      populate: [
        { path: 'category', select: 'name' }, // Populate category name
        { path: 'brand', select: 'name' }, // Populate brand name
      ],
    }).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Format the order details into an invoice object with additional product details
    const invoice = {
      orderId: order._id,
      user: order.user,
      shippingInfo: order.shippingInfo,
      orderItems: order.orderItems.map(item => ({
        name: item.productId.name,
        description: item.productId.description,
        category: item.productId.category ? item.productId.category.name : 'Unknown', // Include category name or set to 'Unknown' if not available
        brand: item.productId.brand ? item.productId.brand.name : 'Unknown', // Include brand name or set to 'Unknown' if not available
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity, // Calculate subtotal for each item
      })),
      itemsPrice: order.itemsPrice,
      taxPrice: order.taxPrice,
      shippingPrice: order.shippingPrice,
      totalPrice: order.totalPrice,
      orderStatus: order.orderStatus,
      createdAt: order.createdAt,
    };

    // Return the detailed invoice report as a JSON response
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    console.error('Error generating invoice:', error);
    res.status(500).json({ success: false, message: 'Failed to generate invoice' });
  }
};
