const {
  Basket,
  BasketCourse,
  BasketVideo,
  Course,
  Video,
} = require("../modules/modules");
const ApiError = require("../error/ApiError");

class BasketController {
  async addCourse(req, res, next) {
    try {
      console.log("Request body:", req.body); // Логирование тела запроса
      console.log("Request user:", req.user); // Логирование пользователя

      const { courseId } = req.body;
      const userId = req.user.id;

      const basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        return next(ApiError.internal("Корзина не найдена"));
      }

      const basketCourse = await BasketCourse.create({
        basketId: basket.id,
        courseId,
      });

      return res.json(basketCourse);
    } catch (err) {
      console.error("Error in addCourse:", err); // Логирование ошибки
      next(ApiError.badRequest(err.message));
    }
  }

  async addVideo(req, res, next) {
    try {
      console.log("Request body:", req.body); // Логирование тела запроса
      console.log("Request user:", req.user); // Логирование пользователя

      const { videoId } = req.body;
      const userId = req.user.id;

      const basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        return next(ApiError.internal("Корзина не найдена"));
      }

      const basketVideo = await BasketVideo.create({
        basketId: basket.id,
        videoId,
      });

      return res.json(basketVideo);
    } catch (err) {
      console.error("Error in addVideo:", err); // Логирование ошибки
      next(ApiError.badRequest(err.message));
    }
  }

  async getBasket(req, res, next) {
    try {
      console.log("Request user:", req.user); // Логирование пользователя

      const userId = req.user.id;

      const basket = await Basket.findOne({
        where: { userId },
        include: [
          { model: BasketCourse, include: [Course] },
          { model: BasketVideo, include: [Video] },
        ],
      });

      return res.json(basket);
    } catch (err) {
      console.error("Error in getBasket:", err); // Логирование ошибки
      next(ApiError.badRequest(err.message));
    }
  }

  async removeCourse(req, res, next) {
    try {
      console.log("Request body:", req.body); // Логирование тела запроса
      console.log("Request user:", req.user); // Логирование пользователя

      const { courseId } = req.body;
      const userId = req.user.id;

      const basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        return next(ApiError.internal("Корзина не найдена"));
      }

      const basketCourse = await BasketCourse.findOne({
        where: { basketId: basket.id, courseId },
      });

      if (!basketCourse) {
        return next(ApiError.internal("Курс не найден в корзине"));
      }

      await basketCourse.destroy();
      return res.json({ message: "Курс удален из корзины" });
    } catch (err) {
      console.error("Error in removeCourse:", err); // Логирование ошибки
      next(ApiError.badRequest(err.message));
    }
  }

  async removeVideo(req, res, next) {
    try {
      console.log("Request body:", req.body); // Логирование тела запроса
      console.log("Request user:", req.user); // Логирование пользователя

      const { videoId } = req.body;
      const userId = req.user.id;

      const basket = await Basket.findOne({ where: { userId } });
      if (!basket) {
        return next(ApiError.internal("Корзина не найдена"));
      }

      const basketVideo = await BasketVideo.findOne({
        where: { basketId: basket.id, videoId },
      });

      if (!basketVideo) {
        return next(ApiError.internal("Видео не найдено в корзине"));
      }

      await basketVideo.destroy();
      return res.json({ message: "Видео удалено из корзины" });
    } catch (err) {
      console.error("Error in removeVideo:", err); // Логирование ошибки
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new BasketController();
