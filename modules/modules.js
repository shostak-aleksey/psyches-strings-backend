const sequelize = require('../src/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
  googleId: { type: DataTypes.STRING, unique: true }, // Добавьте это поле
});

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketCourse = sequelize.define('basket_course', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketVideo = sequelize.define('basket_video', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Course = sequelize.define('course', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  image: { type: DataTypes.STRING, allowNull: false },
});

const Video = sequelize.define('video', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  url: { type: DataTypes.STRING, allowNull: false },
  courseId: { type: DataTypes.INTEGER, allowNull: false },
});

const RefreshToken = sequelize.define('refreshToken', {
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

User.hasOne(Basket);
Basket.belongsTo(User);
Basket.hasMany(BasketCourse);
BasketCourse.belongsTo(Basket);
Basket.hasMany(BasketVideo);
BasketVideo.belongsTo(Basket);
Course.hasMany(Video);
Video.belongsTo(Course);
Course.hasMany(BasketCourse);
BasketCourse.belongsTo(Course);
Video.hasMany(BasketVideo);
BasketVideo.belongsTo(Video);

module.exports = {
  User,
  Basket,
  BasketCourse,
  BasketVideo,
  Course,
  Video,
  RefreshToken,
};
