const express = require("express");

const tagController = require("../controllers/tag");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");



const router = express.Router();

router.post("", checkAuth, extractFile, tagController.validateTag);

router.get("", tagController.getTags);

router.get("/:id", tagController.getTag);

router.put("/:id", checkAuth, extractFile, tagController.updateTag)

router.delete("/:id", checkAuth, tagController.deleteTag);

module.exports = router;