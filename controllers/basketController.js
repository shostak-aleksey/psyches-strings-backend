const { Basket, BasketDevice, Device } = require("../modules/modules");
const ApiError = require("../error/ApiError");

class BasketController {
  async addDevice(req, res, next) {
    const { deviceId } = req.body;
    const userId = req.user.id;

    const basket = await Basket.findOne({ where: { userId } });
    if (!basket) {
      return next(ApiError.internal("Корзина не найдена"));
    }

    const basketDevice = await BasketDevice.create({
      basketId: basket.id,
      deviceId,
    });
    return res.json(basketDevice);
  }

  async getBasket(req, res, next) {
    const userId = req.user.id;

    const basket = await Basket.findOne({
      where: { userId },
      include: [{ model: BasketDevice, include: [Device] }],
    });

    if (!basket) {
      return next(ApiError.internal("Корзина не найдена"));
    }

    return res.json(basket);
  }

  async removeDevice(req, res, next) {
    const { deviceId } = req.body;
    const userId = req.user.id;

    const basket = await Basket.findOne({ where: { userId } });
    if (!basket) {
      return next(ApiError.internal("Корзина не найдена"));
    }

    const basketDevice = await BasketDevice.findOne({
      where: { basketId: basket.id, deviceId },
    });

    if (!basketDevice) {
      return next(ApiError.internal("Устройство не найдено в корзине"));
    }

    await basketDevice.destroy();
    return res.json({ message: "Устройство удалено из корзины" });
  }
}

module.exports = new BasketController();
