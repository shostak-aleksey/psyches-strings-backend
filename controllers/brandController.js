const { Brand } = require("../modules/modules");
const ApiError = require("../error/ApiError");

class BrandController {
  async create(req, res, next) {
    try {
      const { name } = req.body;
      const brand = await Brand.create({ name });
      return res.json(brand);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const brands = await Brand.findAll();
      return res.json(brands);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const brand = await Brand.findOne({ where: { id } });
      if (!brand) {
        return next(ApiError.notFound("Бренд не найден"));
      }
      return res.json(brand);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const brand = await Brand.findOne({ where: { id } });
      if (!brand) {
        return next(ApiError.notFound("Бренд не найден"));
      }
      brand.name = name;
      await brand.save();
      return res.json(brand);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const brand = await Brand.findOne({ where: { id } });
      if (!brand) {
        return next(ApiError.notFound("Бренд не найден"));
      }
      await brand.destroy();
      return res.json({ message: "Бренд удален" });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new BrandController();
