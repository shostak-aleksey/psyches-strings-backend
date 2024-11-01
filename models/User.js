const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  password: { type: String },
  role: { type: String, default: 'USER' },
  type: { type: Array, default: [] },
  displayName: String,
  name: {
    familyName: String,
    givenName: String,
  },
  photos: [
    {
      value: String,
    },
  ],
  gender: String,
  profile: String,
  _json: {
    sub: String,
    name: String,
    given_name: String,
    family_name: String,
    middle_name: String,
    nickname: String,
    preferred_username: String,
    profile: String,
    picture: String,
    website: String,
    email: String,
    email_verified: Boolean,
    gender: String,
    locale: String,
    hd: String,
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
