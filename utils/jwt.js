const jwt = require("jsonwebtoken");

const generateAccessToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.REFRESH_SECRET_KEY, {
    expiresIn: "7d",
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
