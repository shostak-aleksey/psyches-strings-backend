const { Sequelize } = require("sequelize");

module.exports = new Sequelize(
  process.env.BD_NAME, // Название БД
  process.env.BD_USER, // Пользователь
  process.env.BD_PASSWORD, // Пароль
  {
    dialect: "postgres",
    host: process.env.BD_HOST,
    port: process.env.BD_PORT, // Порт должен быть числом
    logging: false,
  }
);
