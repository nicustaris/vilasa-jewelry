const express = require("express");
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
  getAllBrands,
  updateBrand,
  deleteBrand,
  updateCategory,
  deleteCategory,
  updateCoupon,
  deleteCoupon,
} = require("../controllers/productController");

// Routes for products
router
  .route("/products")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct)
  .get(getAllProducts);

router
  .route("/products/admin")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllProductsAdmin);

router
  .route("/products/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct)
  .get(getProductDetails);

router
  .route("/products/:id/reviews")
  .post(isAuthenticatedUser, createProductReview)
  .get(isAuthenticatedUser, getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

router.route("/products/category/:category").get(getProductsByCategory);

router.route("/products/brand/:brand").get(getProductsByBrand);

router.route("/products/top-rated").get(getTopRatedProducts);

router.route("/products/related/:id").get(getRelatedProducts);

router.route("/products/price-range").get(getProductsByPriceRange);

router.route("/products-search/search").get(searchProducts);

router
  .route("/products/category/:category/count")
  .get(getProductCountByCategory);

// Routes for categories
router
  .route("/categories")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCategory)
  .get(isAuthenticatedUser, getAllCategories);

// Routes for coupons
router
  .route("/coupons")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCoupon)
  .get(isAuthenticatedUser, getAllCoupons);

// Routes for brands
router
  .route("/brands")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createBrand)
  .get(isAuthenticatedUser, getAllBrands);

router
  .route("/brands/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBrand)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBrand);

// Categories Routes
router
  .route("/categories")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCategory)
  .get(isAuthenticatedUser, getAllCategories);

router
  .route("/categories/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

// Coupons Routes
router
  .route("/coupons")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createCoupon)
  .get(isAuthenticatedUser, getAllCoupons);

router
  .route("/coupons/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCoupon)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCoupon);

module.exports = router;
