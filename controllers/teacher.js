const Teacher = require("../models/teacher"); // Path to your schema model
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a new Teacher
exports.createTeacher = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Teacher
    const newTeacher = new Teacher({ ...rest, password: hashedPassword });
    const savedTeacher = await newTeacher.save();

    res.status(201).json({
      message: "Teacher created successfully",
      teacher: savedTeacher,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating Teacher", error: error.message });
  }
};

// Login Teacher
exports.loginTeacher = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Find Teacher by email
    console.log(emailId);
    const teacher = await Teacher.findOne({ emailId });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, teacher.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: teacher._id }, "secretKey", {
      expiresIn: "1d",
    });

    // Return teacher data (excluding password)
    const { password: _, ...teacherData } = teacher.toObject();

    res.status(200).json({
      message: " Teacher login successful",
      token,
      teacher: teacherData,
    });
  } catch (error) {
    res.status(400).json({ message: "Error logging in", error: error.message });
  }
};

// Get a Teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching Teacher", error: error.message });
  }
};

// Update a Teacher by ID
exports.updateTeacherById = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;

    // If password is provided, hash it
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({
      message: "Teacher updated successfully",
      teacher: updatedTeacher,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating Teacher", error: error.message });
  }
};

// Delete a Teacher by ID
exports.deleteTeacherById = async (req, res) => {
  try {
    const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting Teacher", error: error.message });
  }
};

// Get all Teachers (with pagination)
exports.getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10

    const teachers = await Teacher.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json(teachers);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error fetching Teachers", error: error.message });
  }
};
