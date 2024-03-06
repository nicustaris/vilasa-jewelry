const express = require("express");
const router = express.Router();
const dynamicImageController = require("../controllers/dynamicImageController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Routes for DynamicImage model
router.route("/")
  .post(isAuthenticatedUser, authorizeRoles("admin"), dynamicImageController.uploadDynamicImage)
  .get(dynamicImageController.getDynamicImages);

router.route("/:id")
  .get(dynamicImageController.getDynamicImage)
  .put(isAuthenticatedUser, authorizeRoles("admin"), dynamicImageController.updateDynamicImage)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), dynamicImageController.deleteDynamicImage);

router.get("/group/:group", dynamicImageController.getDynamicImagesByGroup);

module.exports = router;
