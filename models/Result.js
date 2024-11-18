const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
  score: {
    type: Object, // Change to Object to store test name and category scores
    required: true,
  },
  personalityType: {
    type: Object, // Store the entire PersonalityType document
    required: true,
  },
});

module.exports = mongoose.model('Result', resultSchema);
