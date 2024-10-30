const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  text: { type: String, required: true },
  options: { type: [String], required: true },
});

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;
