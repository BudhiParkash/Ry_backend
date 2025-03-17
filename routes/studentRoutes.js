const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Routes for student APIs
router.post("/v1/student-register", studentController.registerStudent); // Register student
router.post("/v1/student-login", studentController.loginStudent); // Login student
router.get("/v1/student-list", studentController.getAllStudents); // Get all students
router.get("/v1/get-student/:id", studentController.getStudentById); // Get a single student
router.put("/v1/edit-student/:id", studentController.updateStudent); // Update student details
router.delete("/v1/delete-student/:id", studentController.deleteStudent); // Delete student

module.exports = router;
