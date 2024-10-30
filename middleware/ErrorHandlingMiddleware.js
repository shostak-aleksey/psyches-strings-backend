const ApiError = require('../error/ApiError'); // Ensure this path is correct

module.exports = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: 'Internal Server Error' });
};
