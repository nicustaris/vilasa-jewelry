const ProductModel = require("../model/productModel");
const Brand = require("../model//Brand");
const Category = require("../model/Category");
const Coupon = require("../model/Coupon");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const SearchFeatures = require("../utils/searchFeatures");
const cloudinary = require("cloudinary");

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Admin)
 */
exports.createProduct = asyncErrorHandler(async (req, res) => {
  try {
    // Ensure that the request contains product data
    if (!req.body) {
      throw new ErrorHandler(400, "Product data is required");
    }

    // Extract images from the request body
    let images = req.body.images || [];

    // Upload product images to Cloudinary
    const uploadImages = async (images) => {
      const imageLinks = [];

      // Upload images in batches to respect Cloudinary's upload limits
      for (let i = 0; i < images.length; i += 3) {
        const chunk = images.slice(i, i + 3);
        const uploadPromises = chunk.map(async (img) => {
          try {
            const result = await cloudinary.uploader.upload(img, {
              folder: "Products",
            });
            imageLinks.push({
              public_id: result.public_id,
              url: result.secure_url,
            });
          } catch (error) {
            console.error(
              "Failed to upload image to Cloudinary:",
              error.message
            );
            throw new ErrorHandler(
              500,
              "Failed to upload product images to Cloudinary"
            );
          }
        });
        await Promise.all(uploadPromises);
      }

      return imageLinks;
    };

    // Call the function to upload images
    const imagesLinks = await uploadImages(images);

    // Prepare product data with image links
    const productData = { ...req.body, user: req.user.id, images: imagesLinks };

    // Create the new product
    const product = await ProductModel.create(productData);

    // Send success response
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    // Send error response
    res
      .status(error.statusCode || 500)
      .json({ success: false, message: error.message });
  }
});

/**
 * Get all products with pagination
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
exports.getAllProducts = async (req, res) => {
  // Parse and validate the resultPerPage parameter
  const resultPerPage = parseInt(req.query.resultPerPage) || 6;
  if (resultPerPage < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid resultPerPage value" });
  }

  // Parse and validate the page parameter
  const page = parseInt(req.query.page) || 1;
  if (page < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid page value" });
  }

  try {
    // Count total number of products
    const productsCount = await ProductModel.countDocuments();

    // Calculate skip value based on page number and resultPerPage
    const skip = (page - 1) * resultPerPage;

    // Fetch products with pagination
    const products = await ProductModel.find().skip(skip).limit(resultPerPage);

    // Calculate total pages
    const totalPages = Math.ceil(productsCount / resultPerPage);

    res.status(200).json({
      success: true,
      products: products,
      productsCount: productsCount,
      resultPerPage: resultPerPage,
      currentPage: page,
      totalPages: totalPages,
      filteredProductCount: products.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

/**
 * @route   GET /api/products/admin
 * @desc    Get all products (Admin)
 * @access  Private (Admin)
 */
exports.getAllProductsAdmin = asyncErrorHandler(async (req, res) => {
  const products = await ProductModel.find();

  res.status(200).json({
    success: true,
    products,
  });
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private (Admin)
 */
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {
  // Find the product by ID
  let product = await ProductModel.findById(req.params.id);

  // If product is not found, return an error
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Handle image upload
  let images = req.body.images || [];

  // Ensure images is an array
  if (!Array.isArray(images)) {
    images = [images];
  }

  // Delete existing images from Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].product_id);
  }

  // Upload new images to Cloudinary
  const imagesLinks = [];
  for (let img of images) {
    const result = await cloudinary.v2.uploader.upload(img, {
      folder: "Products",
    });

    imagesLinks.push({
      product_id: result.public_id,
      url: result.secure_url,
    });
  }

  // Update product data with new images
  req.body.images = imagesLinks;

  // Update the product in the database
  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  // Send response with updated product
  res.status(200).json({
    success: true,
    product: product,
  });
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 * @access  Private (Admin)
 */
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {
  const productId = req.params.id;

  // Find the product by ID
  const product = await ProductModel.findById(productId);

  // Check if the product exists
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Extract product images
  const productImages = product.images || [];

  try {
    // Delete images from Cloudinary
    await Promise.all(
      productImages.map(async (image) => {
        await cloudinary.v2.uploader.destroy(image.public_id);
      })
    );

    // Remove the product from the database
    await ProductModel.findByIdAndRemove(productId);

    // Send success response
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      productId,
    });
  } catch (error) {
    // Handle any errors that occur during deletion
    return next(new ErrorHandler("Failed to delete product", 500));
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get product details
 * @access  Public
 */
exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await ProductModel.findById(productId);

    // Check if the product exists
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Send success response with product details
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (error) {
    // Handle any unexpected errors
    return next(new ErrorHandler("Failed to fetch product details", 500));
  }
});

// /**
//  * @route   POST /api/products/:id/reviews
//  * @desc    Create or update a product review
//  * @access  Private
//  */
// exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
//   const { ratings, comment, productId, title, recommend } = req.body;
//   const review = {
//     userId: req.user._id,
//     name: req.user.name,
//     ratings: Number(ratings),
//     title: title,
//     comment: comment,
//     recommend: recommend,
//     avatar: req.user.avatar.url, // Add user avatar URL to the review object
//   };

//   const product = await ProductModel.findById(productId);

//   // check if user already reviewed
//   const isReviewed = product.reviews.find((rev) => {
//     return rev.userId.toString() === req.user._id.toString();
//   });

//   if (isReviewed) {
//     // Update the existing review
//     product.reviews.forEach((rev) => {
//       if (rev.userId.toString() === req.user._id.toString()) {
//         rev.ratings = ratings;
//         rev.comment = comment;
//         rev.recommend = recommend;

//         rev.title = title;
//         product.numOfReviews = product.reviews.length;
//       }
//     });
//   } else {
//     // Add a new review
//     product.reviews.push(review);
//     product.numOfReviews = product.reviews.length;
//   }

//   // Calculate average ratings
//   let totalRatings = 0;
//   product.reviews.forEach((rev) => {
//     totalRatings += rev.ratings;
//   });
//   product.ratings = totalRatings / product.reviews.length;

//   // Save to the database
//   await product.save({ validateBeforeSave: false });

//   res.status(200).json({
//     success: true,
//   });
// });
/**
 * @route   POST /api/products/:id/reviews
 * @desc    Create or update a product review
 * @access  Private
 */
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {
  try {
    const { ratings, comment, productId, title, recommend } = req.body;
    const review = {
      userId: req.user._id,
      name: req.user.name,
      ratings: Number(ratings),
      title: title,
      comment: comment,
      recommend: recommend,
      avatar: req.user.avatar.url, // Add user avatar URL to the review object
    };

    const product = await ProductModel.findById(productId);

    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Check if user already reviewed
    const existingReviewIndex = product.reviews.findIndex(
      (rev) => rev.userId.toString() === req.user._id.toString()
    );

    if (existingReviewIndex !== -1) {
      // Update the existing review
      product.reviews[existingReviewIndex] = review;
    } else {
      // Add a new review
      product.reviews.push(review);
    }

    // Update the number of reviews
    product.numOfReviews = product.reviews.length;

    // Calculate average ratings
    let totalRatings = 0;
    product.reviews.forEach((rev) => {
      totalRatings += rev.ratings;
    });
    product.ratings = totalRatings / product.reviews.length;

    // Save to the database
    await product.save();

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(
      new ErrorHandler("Failed to create or update product review", 500)
    );
  }
});

/**
 * @route   GET /api/products/:id/reviews
 * @desc    Get all reviews of a product
 * @access  Public
 */
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {
  try {
    // Find the product by ID
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);

    // Check if the product exists
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Return the reviews of the product
    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    // Handle any errors that occur
    return next(new ErrorHandler("Failed to fetch product reviews", 500));
  }
});

/**
 * @route   DELETE /api/products/:id/reviews
 * @desc    Delete a review
 * @access  Private
 */
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {
  try {
    // Find the product by ID
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);

    // Check if the product exists
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }

    // Find the index of the review to delete
    const reviewIndex = product.reviews.findIndex(
      (rev) => rev._id.toString() === req.query.id.toString()
    );

    // Check if the review exists
    if (reviewIndex === -1) {
      return next(new ErrorHandler("Review not found", 404));
    }

    // Remove the review from the reviews array
    product.reviews.splice(reviewIndex, 1);

    // Update the product's ratings and number of reviews
    let totalRatings = 0;
    product.reviews.forEach((rev) => {
      totalRatings += rev.ratings;
    });

    product.ratings =
      product.reviews.length > 0 ? totalRatings / product.reviews.length : 0;
    product.numOfReviews = product.reviews.length;

    // Save the updated product
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    // Handle any errors that occur
    return next(new ErrorHandler("Failed to delete review", 500));
  }
});

/**
 * @route   GET /api/products/category/:category
 * @desc    Get products by category
 * @access  Public
 */
exports.getProductsByCategory = asyncErrorHandler(async (req, res, next) => {
  try {
    const category = req.params.category;

    // Validate category input
    if (!category) {
      return next(new ErrorHandler("Category parameter is missing", 400));
    }

    // Find products by category
    const products = await ProductModel.find({ category: category });

    // Check if products were found
    if (!products || products.length === 0) {
      return next(
        new ErrorHandler(`No products found for category: ${category}`, 404)
      );
    }

    // Send success response with products
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    // Handle any errors that occur
    return next(new ErrorHandler("Failed to fetch products by category", 500));
  }
});

/**
 * @route   GET /api/products/brand/:brand
 * @desc    Get products by brand
 * @access  Public
 */
exports.getProductsByBrand = asyncErrorHandler(async (req, res, next) => {
  try {
    const brandName = req.params.brand;

    // Validate brand name input
    if (!brandName) {
      return next(new ErrorHandler("Brand parameter is missing", 400));
    }

    // Find products by brand name
    const products = await ProductModel.find({ "brand.name": brandName });

    // Check if products were found
    if (!products || products.length === 0) {
      return next(
        new ErrorHandler(`No products found for brand: ${brandName}`, 404)
      );
    }

    // Send success response with products
    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    // Handle any errors that occur
    return next(new ErrorHandler("Failed to fetch products by brand", 500));
  }
});

/**
 * @route   GET /api/products/top-rated
 * @desc    Get top rated products
 * @access  Public
 */
exports.getTopRatedProducts = asyncErrorHandler(async (req, res, next) => {
  const products = await ProductModel.find().sort({ ratings: -1 }).limit(10);

  res.status(200).json({
    success: true,
    products: products,
  });
});

/**
 * @route   GET /api/products/related/:id
 * @desc    Get related products
 * @access  Public
 */
exports.getRelatedProducts = asyncErrorHandler(async (req, res, next) => {
  const productId = req.params.id;
  const product = await ProductModel.findById(productId);
  const relatedProducts = await ProductModel.find({
    $or: [{ category: product.category }, { "brand.name": product.brand.name }],
    _id: { $ne: productId },
  }).limit(4);

  res.status(200).json({
    success: true,
    products: relatedProducts,
  });
});

/**
 * @route   GET /api/products/price-range
 * @desc    Get products by price range
 * @access  Public
 */
exports.getProductsByPriceRange = asyncErrorHandler(async (req, res, next) => {
  const { minPrice, maxPrice } = req.query;
  const products = await ProductModel.find({
    price: { $gte: minPrice, $lte: maxPrice },
  });

  res.status(200).json({
    success: true,
    products: products,
  });
});

/**
 * @route   GET /api/products/search
 * @desc    Get products by search query
 * @access  Public
 */
exports.searchProducts = async (req, res, next) => {
  try {
    const apiFeature = new SearchFeatures(ProductModel.find(), req.query)
      .fuzzySearch() // Apply search filter based on the query parameters
      .filter(); // Apply additional filters based on the query parameters

    let products = await apiFeature.query; // Fetch the products based on the applied filters and search

    res.status(200).json({
      success: true,
      products: products,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500)); // Handle any errors
  }
};

/**
 * @route   GET /api/products/category/:category/count
 * @desc    Get product count by category
 * @access  Public
 */
exports.getProductCountByCategory = asyncErrorHandler(
  async (req, res, next) => {
    const category = req.params.category;
    const productCount = await ProductModel.countDocuments({
      category: category,
    });

    res.status(200).json({
      success: true,
      productCount: productCount,
    });
  }
);

// Brand Controller

// Create a new brand
exports.createBrand = async (req, res, next) => {
  try {
    const { title, description, picture } = req.body;
    const brand = await Brand.create({ title, description, picture });
    res.status(201).json({ success: true, brand });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Get all brands
exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.find();
    res.status(200).json({ success: true, brands });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// Update a brand by ID
exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, picture } = req.body;
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { title, description, picture },
      { new: true }
    );
    if (!updatedBrand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }
    res.status(200).json({ success: true, brand: updatedBrand });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Delete a brand by ID
exports.deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBrand = await Brand.findByIdAndDelete(id);
    if (!deletedBrand) {
      return res
        .status(404)
        .json({ success: false, message: "Brand not found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Brand deleted successfully",
        brand: deletedBrand,
      });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Category Controller

// Create a new category
exports.createCategory = async (req, res, next) => {
  try {
    const { title } = req.body;
    const category = await Category.create({ title });
    res.status(201).json({ success: true, category });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Get all categories
exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No categories found" });
    }
    res.status(200).json({ success: true, categories });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// Update a category by ID
exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({ success: true, category: updatedCategory });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Delete a category by ID
exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      deletedCategory,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Coupon Controller

// Create a new coupon
exports.createCoupon = async (req, res, next) => {
  try {
    const { name, expiry, discount } = req.body;
    const coupon = await Coupon.create({ name, expiry, discount });
    res.status(201).json({ success: true, coupon });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Get all coupons
exports.getAllCoupons = asyncErrorHandler(async (req, res, next) => {
  const coupons = await Coupon.find().clone();
  res.status(200).json({ success: true, coupons });
});

// Update a coupon by ID
exports.updateCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, expiry, discount } = req.body;
    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { name, expiry, discount },
      { new: true }
    );
    if (!updatedCoupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }
    res.status(200).json({ success: true, coupon: updatedCoupon });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

// Delete a coupon by ID
exports.deleteCoupon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    if (!deletedCoupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Coupon deleted successfully" });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};
