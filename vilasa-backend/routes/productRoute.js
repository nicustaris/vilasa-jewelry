const express = require('express');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
    createProduct,
    getAllProducts,
    getAllProductsAdmin,
    updateProduct,
    deleteProduct,
    getProductDetails,
    createProductReview,
    getProductReviews,
    deleteReview,
    getProductsByCategory,
    getProductsByBrand,
    getTopRatedProducts,
    getRelatedProducts,
    getProductsByPriceRange,
    searchProducts,
    getProductCountByCategory,
    createCategory,
    getAllCategories,
    createCoupon,
    getAllCoupons,
    createBrand,
    getAllBrands
} = require('../controllers/productController');

// Routes for products
router.route('/')
    .post(isAuthenticatedUser, createProduct)
    .get(isAuthenticatedUser, getAllProducts);

router.route('/admin')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAllProductsAdmin);

router.route('/:id')
    .put(isAuthenticatedUser, updateProduct)
    .delete(isAuthenticatedUser, deleteProduct)
    .get(isAuthenticatedUser, getProductDetails);

router.route('/:id/reviews')
    .post(isAuthenticatedUser, createProductReview)
    .get(isAuthenticatedUser, getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

router.route('/category/:category')
    .get(isAuthenticatedUser, getProductsByCategory);

router.route('/brand/:brand')
    .get(isAuthenticatedUser, getProductsByBrand);

router.route('/top-rated')
    .get(isAuthenticatedUser, getTopRatedProducts);

router.route('/related/:id')
    .get(isAuthenticatedUser, getRelatedProducts);

router.route('/price-range')
    .get(isAuthenticatedUser, getProductsByPriceRange);

router.route('/search')
    .get(isAuthenticatedUser, searchProducts);

router.route('/category/:category/count')
    .get(isAuthenticatedUser, getProductCountByCategory);

// Routes for categories
router.route('/categories')
    .post(isAuthenticatedUser, authorizeRoles('admin'), createCategory)
    .get(isAuthenticatedUser, getAllCategories);

// Routes for coupons
router.route('/coupons')
    .post(isAuthenticatedUser, authorizeRoles('admin'), createCoupon)
    .get(isAuthenticatedUser, getAllCoupons);

// Routes for brands
router.route('/brands')
    .post(isAuthenticatedUser, authorizeRoles('admin'), createBrand)
    .get(isAuthenticatedUser, getAllBrands);

module.exports = router;
