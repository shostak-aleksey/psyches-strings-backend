const uuid = require("uuid");
const path = require("path");
const { Video } = require("../modules/modules");
const ApiError = require("../error/ApiError");

class VideoController {
  async create(req, res, next) {
    try {
      let { title, description, price, courseId } = req.body;
      console.log("Request files:", req.files); // Для отладки
      const { video } = req.files;

      if (!video) {
        return next(ApiError.badRequest("Video file is missing"));
      }

      let videoFilename = uuid.v4() + ".mp4";
      video.mv(path.resolve(__dirname, "..", "static", videoFilename));

      const videoEntry = await Video.create({
        title,
        description,
        price,
        url: videoFilename,
        courseId,
      });

      return res.json(videoEntry);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const videos = await Video.findAll();
      return res.json(videos);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const video = await Video.findOne({ where: { id } });
      return res.json(video);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      let { title, description, price, courseId } = req.body;
      console.log("Request files:", req.files); // Для отладки
      const { video } = req.files;

      const videoEntry = await Video.findOne({ where: { id } });
      if (!videoEntry) {
        return next(ApiError.notFound("Видео не найдено"));
      }

      if (video) {
        let videoFilename = uuid.v4() + ".mp4";
        video.mv(path.resolve(__dirname, "..", "static", videoFilename));
        videoEntry.url = videoFilename;
      }

      videoEntry.title = title;
      videoEntry.description = description;
      videoEntry.price = price;
      videoEntry.courseId = courseId;

      await videoEntry.save();

      return res.json(videoEntry);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const video = await Video.findOne({ where: { id } });
      if (!video) {
        return next(ApiError.notFound("Видео не найдено"));
      }
      await video.destroy();
      return res.json({ message: "Видео удалено" });
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }
}

module.exports = new VideoController();
