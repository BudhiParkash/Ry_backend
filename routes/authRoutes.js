const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Admin APIs
router.post("/v1/admin/create", authController.createAdmin); // Create Admin
router.post("/v1/admin/login", authController.adminLogin); // Admin Login

router.get("/v1/admin/list", authController.adminList);

// Teacher APIs
// router.post("/teacher/create", authController.createTeacher); // Create Teacher
// router.post("/teacher/login", authController.teacherLogin); // Teacher Login

module.exports = router;
