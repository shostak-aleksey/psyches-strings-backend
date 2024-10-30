require('dotenv').config();
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const router = require('../routes/index'); // Ensure this path is correct
const path = require('path');
const swaggerSetup = require('../swagger'); // Ensure this path is correct
const cookieParser = require('cookie-parser');
const errorHandler = require('../middleware/ErrorHandlingMiddleware'); // Ensure this path is correct

// Existing server setup...
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 5173;
const MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb+srv://shostakaleshka:Gf67xpljWEBknLjy@psyches-strings.9d78j.mongodb.net/'; // MongoDB URI

const app = express();
app.use(cors({ credentials: true, origin: `${CLIENT_URL}` }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'static')));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', // Use a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set to true if using HTTPS
  }),
);

app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload({}));
app.use('/api', router);

swaggerSetup(app);

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = { app };
