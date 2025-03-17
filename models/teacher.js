const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is mandatory
      trim: true,
    },
    emailId: {
      type: String,
      required: true,
      unique: true, // Email should be unique
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Invalid email format"], // Basic email format validation
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Minimum password length
    },
    city: {
      type: String,
      trim: true,
    },
    pincode: {
      type: String,
      trim: true,
      // Pincode validation (5 or 6 digits)
    },
    phoneNumber: {
      type: String,
      match: [/^\d{10}$/, "Invalid phone number format"], // 10-digit phone number
      trim: true,
    },
    class: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    feePaid: {
      type: Number,
      min: 0, // Fee should not be negative
    },
    courseOrLevelTeaching: {
      type: String,
      trim: true,
    },
    trainedTillWhichLevel: {
      type: String,
      trim: true,
    },
    numberOfStudents: {
      type: Number,
      min: 0, // Should not be negative
    },
    studentName: {
      type: [String], // Array of student names
      default: [],
    },
    numberOfCourseTeaching: {
      type: Number,
      min: 0, // Should not be negative
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
