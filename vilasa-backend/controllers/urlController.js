const Url = require("../model/Url");

// @desc    Create URL
// @route   POST /api/urls
// @access  Public
exports.createUrl = async (req, res, next) => {
  try {
    const url = await Url.create(req.body);
    res.status(201).json({
      success: true,
      data: url,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all URLs
// @route   GET /api/urls
// @access  Public
exports.getUrls = async (req, res, next) => {
  try {
    const urls = await Url.find();
    res.status(200).json({
      success: true,
      count: urls.length,
      data: urls,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single URL
// @route   GET /api/urls/:id
// @access  Public
exports.getUrl = async (req, res, next) => {
  try {
    const url = await Url.findById(req.params.id);
    if (!url) {
      return res.status(404).json({
        success: false,
        error: "URL not found",
      });
    }
    res.status(200).json({
      success: true,
      data: url,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update URL
// @route   PATCH /api/urls/:id
// @access  Admin
exports.updateUrl = async (req, res, next) => {
  try {
    let url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        success: false,
        error: "URL not found",
      });
    }

    url = await Url.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: url,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete URL
// @route   DELETE /api/urls/:id
// @access  Admin
exports.deleteUrl = async (req, res, next) => {
  try {
    const url = await Url.findById(req.params.id);

    if (!url) {
      return res.status(404).json({
        success: false,
        error: "URL not found",
      });
    }

    await url.remove();

    res.status(200).json({
      success: true,
      message: "URL deleted",
    });
  } catch (error) {
    next(error);
  }
};
