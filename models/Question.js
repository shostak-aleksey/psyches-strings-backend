const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  category: { type: String, required: true },
  scoring: { type: String, required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
});

module.exports = mongoose.model('Question', questionSchema);
