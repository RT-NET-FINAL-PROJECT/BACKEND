const { Post } = require("../models");
class ControllerEvent {
  static async findAllEvent(req, res, next) {
    try {
      const events = await Post.findall({
        where: {
          category: "event",
        },
      });

      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async detailEvent(req, res, next) {
    try {
      const { postId } = req.params;

      const event = await Post.findByPk(postId);
      if (!event) throw { name: "POST_NOT_FOUND" };

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }

  static async createEvent(req, res, next) {
    try {
      const {name, deskripsi, kategori, lokasi, biaya} = req.body;

   } catch (error) {
      next(error);
    }
  }

  static async updateEvent(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  static async deleteEvent(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerEvent;
