require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const router = require('../routes/index');
const errorHandler = require('../middleware/ErrorHandlingMiddleware');
const path = require('path');
const swaggerSetup = require('../swagger');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 3000;

const app = express();
app.use(cors({ credentials: true, origin: `${CLIENT_URL}` }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '..', 'static')));
app.use(cookieParser());

app.use(fileUpload({}));
app.use('/api', router);

swaggerSetup(app);

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    sequelize.options.logging = console.log;
  } catch (e) {
    console.log(e);
  }
};

start();

module.exports = { app };
