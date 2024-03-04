const express = require('express');
const router = express.Router();
const { asyncWrapper } = require('../middlewares/asyncWrapper');
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
    getProductCountByCategory
} = require('../controllers/productController');

// Routes
router.route('/')
    .post(asyncWrapper(createProduct)) // Create a new product
    .get(asyncWrapper(getAllProducts)); // Get all products

router.route('/admin')
    .get(asyncWrapper(getAllProductsAdmin)); // Get all products (Admin)

router.route('/:id')
    .put(asyncWrapper(updateProduct)) // Update a product
    .delete(asyncWrapper(deleteProduct)) // Delete a product
    .get(asyncWrapper(getProductDetails)); // Get product details

router.route('/:id/reviews')
    .post(asyncWrapper(createProductReview)) // Create or update a product review
    .get(asyncWrapper(getProductReviews)) // Get all reviews of a product
    .delete(asyncWrapper(deleteReview)); // Delete a review

router.route('/category/:category')
    .get(asyncWrapper(getProductsByCategory)); // Get products by category

router.route('/brand/:brand')
    .get(asyncWrapper(getProductsByBrand)); // Get products by brand

router.route('/top-rated')
    .get(asyncWrapper(getTopRatedProducts)); // Get top rated products

router.route('/related/:id')
    .get(asyncWrapper(getRelatedProducts)); // Get related products

router.route('/price-range')
    .get(asyncWrapper(getProductsByPriceRange)); // Get products by price range

router.route('/search')
    .get(asyncWrapper(searchProducts)); // Get products by search query

router.route('/category/:category/count')
    .get(asyncWrapper(getProductCountByCategory)); // Get product count by category

module.exports = router;
