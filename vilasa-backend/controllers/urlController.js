const Url = require("../model/Url");
const ErrorHandler = require("../utils/errorHandler");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");

// @desc    Create URL
// @route   POST /api/urls
// @access  Public
exports.createUrl = asyncErrorHandler(async (req, res, next) => {
  const url = await Url.create(req.body);
  res.status(201).json({
    success: true,
    data: url,
  });
});

// @desc    Get all URLs
// @route   GET /api/urls
// @access  Public
exports.getUrls = asyncErrorHandler(async (req, res, next) => {
  const urls = await Url.find();
  res.status(200).json({
    success: true,
    count: urls.length,
    data: urls,
  });
});

// @desc    Get single URL
// @route   GET /api/urls/:id
// @access  Public
exports.getUrl = asyncErrorHandler(async (req, res, next) => {
  const url = await Url.findById(req.params.id);
  if (!url) {
    return next(new ErrorHandler("URL not found", 404));
  }
  res.status(200).json({
    success: true,
    data: url,
  });
});

// @desc    Update URL
// @route   PATCH /api/urls/:id
// @access  Admin
exports.updateUrl = asyncErrorHandler(async (req, res, next) => {
  let url = await Url.findById(req.params.id);

  if (!url) {
    return next(new ErrorHandler("URL not found", 404));
  }

  url = await Url.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: url,
  });
});

// @desc    Delete URL
// @route   DELETE /api/urls/:id
// @access  Admin
exports.deleteUrl = asyncErrorHandler(async (req, res, next) => {
  const url = await Url.findById(req.params.id);

  if (!url) {
    return next(new ErrorHandler("URL not found", 404));
  }

  const urlData = await url.remove();

  res.status(200).json({
    success: true,
    message: "URL deleted",
    data: urlData,
  });
});
