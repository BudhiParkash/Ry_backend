const express = require("express");
const userController = require("../controllers/teacher");

const router = express.Router();

// Routes for CRUD operations
router.post("/v1/create-teacher", userController.createTeacher); // Create a new user
router.post("/v1/login-teacher", userController.loginTeacher); // Create a new user
router.get("/v1/get-teacher/:id", userController.getTeacherById); // Get a user by ID
router.put("v1/edit-teacher/:id", userController.updateTeacherById); // Update a user by ID
router.delete("/v1/delete-teacher/:id", userController.deleteTeacherById); // Delete a user by ID
router.get("/v1/get-allteacher/", userController.getAllTeachers); // Get all users

module.exports = router;
