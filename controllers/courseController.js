const uuid = require('uuid');
const path = require('path');
const { Course, Video } = require('../models/modules');
const ApiError = require('../error/ApiError');

class CourseController {
  async create(req, res, next) {
    try {
      let { name, price, description } = req.body;
      const { image } = req.files;

      let imageFilename = uuid.v4() + '.jpg';
      image.mv(path.resolve(__dirname, '..', 'static', imageFilename));

      const course = await Course.create({
        name,
        price,
        description,
        image: imageFilename,
      });

      return res.json(course);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const courses = await Course.findAll();
      return res.json(courses);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const course = await Course.findOne({
        where: { id },
        include: [{ model: Video }],
      });
      return res.json(course);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      let { name, price, description } = req.body;
      const { image } = req.files;

      const course = await Course.findOne({ where: { id } });
      if (!course) {
        return next(ApiError.notFound('Курс не найден'));
      }

      if (image) {
        let imageFilename = uuid.v4() + '.jpg';
        image.mv(path.resolve(__dirname, '..', 'static', imageFilename));
        course.image = imageFilename;
      }

      course.name = name;
      course.price = price;
      course.description = description;

      await course.save();

      return res.json(course);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const course = await Course.findOne({ where: { id } });
      if (!course) {
        return next(ApiError.notFound('Курс не найден'));
      }
      await course.destroy();
      return res.json({ message: 'Курс удален' });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new CourseController();
