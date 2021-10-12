const express = require("express");

const studentController = require("../controllers/student");
const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file");



const router = express.Router();

router.post("", checkAuth, extractFile, studentController.createStudent);

router.get("", studentController.getStudents);

router.get("/:id", studentController.getStudent);

router.put("/:id", checkAuth, extractFile, studentController.updateStudent)

router.delete("/:id", checkAuth, studentController.deleteStudent);

module.exports = router;