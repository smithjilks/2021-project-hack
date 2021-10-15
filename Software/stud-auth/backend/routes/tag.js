const express = require("express");

const tagController = require("../controllers/tag");
const checkAuth = require("../middleware/check-auth");



const router = express.Router();

router.post("/validateTag", tagController.validateTag);

//router.get("", tagController.getTags);

//router.get("/:id", checkAuth,tagController.getTag);

router.put("/:id", checkAuth, tagController.updateTag)

router.delete("/:id", checkAuth, tagController.deleteTag);

module.exports = router;