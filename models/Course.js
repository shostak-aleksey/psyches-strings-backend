const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
