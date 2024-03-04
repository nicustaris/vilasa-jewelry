const ProductModel = require('../model/ProductModel ');
const ErrorHandler = require("../utils/errorHandler");
const asyncWrapper = require("../middleWare/asyncWrapper");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Admin)
 */
exports.createProduct = asyncWrapper(async (req, res) => {
  let images = []; 

  if (req.body.images) {
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    const imagesLinks = [];

    // Split images into chunks due to cloudinary upload limits only 3 images can be uploaded at a time so we are splitting into chunks and uploading them separately eg: 9 images will be split into 3 chunks and uploaded separately
    const chunkSize = 3;
    const imageChunks = [];
    while (images.length > 0) {
      imageChunks.push(images.splice(0, chunkSize));
    }


    // Upload images in separate requests. for loop will run 3 times if there are 9 images to upload each time uploading 3 images at a time
    for (let chunk of imageChunks) {
      const uploadPromises = chunk.map((img) =>
        cloudinary.v2.uploader.upload(img, {
          folder: "Products",
        })
      );

      
      const results = await Promise.all(uploadPromises); // wait for all the promises to resolve and store the results in results array eg: [{}, {}, {}] 3 images uploaded successfully and their details are stored in results array

      for (let result of results) { 
        imagesLinks.push({
          product_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    req.body.user = req.user.id;
    req.body.images = imagesLinks;
  }

  const data = await ProductModel.create(req.body);

  res.status(200).json({ success: true, data: data });
});

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
exports.getAllProducts = asyncWrapper(async (req, res) => {
  const resultPerPage = 6; // Number of products visible per page
  const productsCount = await ProductModel.countDocuments(); // Get total number of products

  // Create an instance of the ApiFeatures class, passing the ProductModel.find() query and req.query (queryString)
  const apiFeature = new ApiFeatures(ProductModel.find(), req.query)
    .search() // Apply search filter based on the query parameters
    .filter(); // Apply additional filters based on the query parameters

  let products = await apiFeature.query; // Fetch the products based on the applied filters and search

  let filteredProductCount = products.length; // Number of products after filtering (for pagination)

  apiFeature.Pagination(resultPerPage); // Apply pagination to the products

  // Mongoose no longer allows executing the same query object twice, so use .clone() to retrieve the products again
  products = await apiFeature.query.clone(); // Retrieve the paginated products

  res.status(200).json({
    success: true,
    products: products,
    productsCount: productsCount,
    resultPerPage: resultPerPage,
    filteredProductCount: filteredProductCount,
  });
});

/**
 * @route   GET /api/products/admin
 * @desc    Get all products (Admin)
 * @access  Private (Admin)
 */
exports.getAllProductsAdmin = asyncWrapper(async (req, res) => {
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
exports.updateProduct = asyncWrapper(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].product_id);
    }

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

    req.body.images = imagesLinks;
  }

  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

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
exports.deleteProduct = asyncWrapper(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].product_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product delete successfully",
  });
});

/**
 * @route   GET /api/products/:id
 * @desc    Get product details
 * @access  Public
 */
exports.getProductDetails = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const Product = await ProductModel.findById(id);
  if (!Product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    Product: Product,
  });
});

/**
 * @route   POST /api/products/:id/reviews
 * @desc    Create or update a product review
 * @access  Private
 */
exports.createProductReview = asyncWrapper(async (req, res, next) => {
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

  // check if user already reviewed
  const isReviewed = product.reviews.find((rev) => {
    return rev.userId.toString() === req.user._id.toString();
  });

  if (isReviewed) {
    // Update the existing review
    product.reviews.forEach((rev) => {
      if (rev.userId.toString() === req.user._id.toString()) {
        rev.ratings = ratings;
        rev.comment = comment;
        rev.recommend = recommend;
        
        rev.title = title;
        product.numOfReviews = product.reviews.length;
      }
    });
  } else {
    // Add a new review
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  // Calculate average ratings
  let totalRatings = 0;
  product.reviews.forEach((rev) => {
    totalRatings += rev.ratings;
  });
  product.ratings = totalRatings / product.reviews.length;

  // Save to the database
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

/**
 * @route   GET /api/products/:id/reviews
 * @desc    Get all reviews of a product
 * @access  Public
 */
exports.getProductReviews = asyncWrapper(async (req, res, next) => {
  // we need product id for all reviews of the product

  const product = await ProductModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

/**
 * @route   DELETE /api/products/:id/reviews
 * @desc    Delete a review
 * @access  Private
 */
exports.deleteReview = asyncWrapper(async (req, res, next) => {
  // we have review id and product id here in req object
  // find the product with product id

  const product = await ProductModel.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404)); 
  }

  // check if there any review available with given review id. then filter the review array store inside reviews without that review
  const reviews = product.reviews.filter(
    (rev) => { return rev._id.toString() !== req.query.id.toString()}
  );
  // once reviews filtered then update new rating from product review
  let avg = 0;
  reviews.forEach((rev) => {
   
    avg += rev.ratings;
  });

  
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  // also set numOfReviews in product
  const numOfReviews = reviews.length;
  // now update the product schema with these values
  await ProductModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});

/**
 * @route   GET /api/products/category/:category
 * @desc    Get products by category
 * @access  Public
 */
exports.getProductsByCategory = asyncWrapper(async (req, res, next) => {
    const category = req.params.category;
    const products = await ProductModel.find({ category: category });

    res.status(200).json({
        success: true,
        products: products,
    });
});

/**
 * @route   GET /api/products/brand/:brand
 * @desc    Get products by brand
 * @access  Public
 */
exports.getProductsByBrand = asyncWrapper(async (req, res, next) => {
    const brand = req.params.brand;
    const products = await ProductModel.find({ "brand.name": brand });

    res.status(200).json({
        success: true,
        products: products,
    });
});

/**
 * @route   GET /api/products/top-rated
 * @desc    Get top rated products
 * @access  Public
 */
exports.getTopRatedProducts = asyncWrapper(async (req, res, next) => {
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
exports.getRelatedProducts = asyncWrapper(async (req, res, next) => {
    const productId = req.params.id;
    const product = await ProductModel.findById(productId);
    const relatedProducts = await ProductModel.find({
        $or: [{ category: product.category }, { "brand.name": product.brand.name }],
        _id: { $ne: productId }
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
exports.getProductsByPriceRange = asyncWrapper(async (req, res, next) => {
    const { minPrice, maxPrice } = req.query;
    const products = await ProductModel.find({
        price: { $gte: minPrice, $lte: maxPrice }
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
exports.searchProducts = asyncWrapper(async (req, res, next) => {
    const keyword = req.query.keyword;
    const products = await ProductModel.find({ $text: { $search: keyword } });

    res.status(200).json({
        success: true,
        products: products,
    });
});

/**
 * @route   GET /api/products/category/:category/count
 * @desc    Get product count by category
 * @access  Public
 */
exports.getProductCountByCategory = asyncWrapper(async (req, res, next) => {
    const category = req.params.category;
    const productCount = await ProductModel.countDocuments({ category: category });

    res.status(200).json({
        success: true,
        productCount: productCount,
    });
});
