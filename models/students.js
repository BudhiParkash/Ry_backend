const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  class: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  feePaid: { type: Boolean, default: false },
  level: { type: String, required: true },
  accessToVideos: { type: Boolean, default: false },
  dateOfRegistration: { type: Date, default: Date.now },
  guardianRelation: { type: String, required: true },
  guardianName: { type: String, required: true },
  teacherName: { type: String, required: true },
  currentCourse: { type: String, required: true },
});

module.exports = mongoose.model("Students", studentSchema);
