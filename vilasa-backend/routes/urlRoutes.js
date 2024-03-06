const express = require("express");
const router = express.Router();
const urlController = require("../controllers/urlController");
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

// Routes for Url model
router.route("/")
  .post(isAuthenticatedUser, authorizeRoles("admin"), urlController.createUrl)
  .get(urlController.getUrls);

router.route("/:id")
  .get(urlController.getUrl)
  .patch(isAuthenticatedUser, authorizeRoles("admin"), urlController.updateUrl)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), urlController.deleteUrl);

module.exports = router;
