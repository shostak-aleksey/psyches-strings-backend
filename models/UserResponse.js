const mongoose = require('mongoose');

const UserResponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  },
  questionText: { type: String, required: true },
  answer: { type: String, required: true },
});

module.exports = mongoose.model('UserResponse', UserResponseSchema);
