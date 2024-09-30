const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Нет заголовка авторизации");
      return res.status(401).json({ message: "Нет авторизации" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.log("Нет токена в заголовке авторизации");
      return res.status(401).json({ message: "Нет авторизации" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    console.log("Пользователь аутентифицирован:", decoded); // Логирование пользователя
    next();
  } catch (e) {
    console.log("Ошибка аутентификации:", e.message); // Логирование ошибки
    return res.status(401).json({ message: "Нет авторизации" });
  }
};
