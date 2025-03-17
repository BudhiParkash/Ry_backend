const Student = require("../models/students");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register a new student
exports.registerStudent = async (req, res) => {
  try {
    const { name, emailId, password, ...rest } = req.body;

    // Check if the student already exists
    const existingStudent = await Student.findOne({ emailId });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const student = new Student({
      name,
      emailId,
      password: hashedPassword,
      ...rest,
    });
    await student.save();

    res
      .status(201)
      .json({ message: "Student registered successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error registering student", error });
  }
};

// Login a student
exports.loginStudent = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Find the student by email
    const student = await Student.findOne({ emailId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: student._id }, "secretKey", {
      expiresIn: "1d",
    });

    // Return the student data (excluding the password)
    const { password: _, ...studentData } = student.toObject();
    res
      .status(200)
      .json({ message: "Login successful", token, student: studentData });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

// Update student details
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
};
