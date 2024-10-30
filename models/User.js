const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  role: { type: String, default: 'USER' },
  type: { type: Array, default: [] },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
