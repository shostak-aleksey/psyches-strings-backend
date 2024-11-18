const mongoose = require('mongoose');

const personalityTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test', required: true },
});

module.exports = mongoose.model('PersonalityType', personalityTypeSchema);
