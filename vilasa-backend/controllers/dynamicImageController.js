const DynamicImage = require("../model/DynamicImage");
const cloudinary = require("cloudinary").v2;

// @desc    Upload dynamic image
// @route   POST /api/dynamic-images/upload
// @access  Admin
exports.uploadDynamicImage = async (req, res, next) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: "No files were uploaded." });
    }

    const file = req.files.file;

    // Upload image to Cloudinary
    cloudinary.uploader.upload(file.tempFilePath, async (error, result) => {
      if (error) {
        return next(error);
      }

      // Save image URL and group to database
      const dynamicImage = await DynamicImage.create({
        imageUrl: result.secure_url,
        group: req.body.group,
      });

      res.status(201).json({
        success: true,
        data: dynamicImage,
      });
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all dynamic images
// @route   GET /api/dynamic-images
// @access  Public
exports.getDynamicImages = async (req, res, next) => {
  try {
    const dynamicImages = await DynamicImage.find();
    res.status(200).json({
      success: true,
      count: dynamicImages.length,
      data: dynamicImages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single dynamic image
// @route   GET /api/dynamic-images/:id
// @access  Public
exports.getDynamicImage = async (req, res, next) => {
  try {
    const dynamicImage = await DynamicImage.findById(req.params.id);
    if (!dynamicImage) {
      return res.status(404).json({
        success: false,
        error: "Dynamic image not found",
      });
    }
    res.status(200).json({
      success: true,
      data: dynamicImage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update dynamic image
// @route   PUT /api/dynamic-images/:id
// @access  Admin
exports.updateDynamicImage = async (req, res, next) => {
  try {
    let dynamicImage = await DynamicImage.findById(req.params.id);

    if (!dynamicImage) {
      return res.status(404).json({
        success: false,
        error: "Dynamic image not found",
      });
    }

    dynamicImage = await DynamicImage.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: dynamicImage,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete dynamic image
// @route   DELETE /api/dynamic-images/:id
// @access  Admin
exports.deleteDynamicImage = async (req, res, next) => {
  try {
    const dynamicImage = await DynamicImage.findById(req.params.id);

    if (!dynamicImage) {
      return res.status(404).json({
        success: false,
        error: "Dynamic image not found",
      });
    }

    await dynamicImage.remove();

    res.status(200).json({
      success: true,
      message: "Dynamic image deleted",
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Get dynamic images by group
// @route   GET /api/dynamic-images/group/:group
// @access  Public
exports.getDynamicImagesByGroup = async (req, res, next) => {
    try {
      const { group } = req.params;
      const dynamicImages = await DynamicImage.find({ group });
  
      if (!dynamicImages || dynamicImages.length === 0) {
        return res.status(404).json({
          success: false,
          error: "Dynamic images not found for the specified group",
        });
      }
  
      res.status(200).json({
        success: true,
        count: dynamicImages.length,
        data: dynamicImages,
      });
    } catch (error) {
      next(error);
    }
  };
  