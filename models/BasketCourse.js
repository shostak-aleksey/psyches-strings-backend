const mongoose = require('mongoose');

const basketCourseSchema = new mongoose.Schema({
  basketId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Basket',
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
});

const BasketCourse = mongoose.model('BasketCourse', basketCourseSchema);
module.exports = BasketCourse;
