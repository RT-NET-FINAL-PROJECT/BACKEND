const { Post } = require("../models");
class ControllerEvent {
  static async findAllEvent(req, res, next) {
    try {
      let options = {
        where: {
          category: "event",
          rt_id: req.user.rt_id
        },
      };

      const events = await Post.findall(options);

      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async findAllAnnouncements(req, res, next) {
    try {
      const announcements = await Post.findall({
        where: {
          category: "pengumuman",
        },
      });

      res.status(200).json(announcements);
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
      const { name, deskripsi, kategori, lokasi, biaya } = req.body;
      if (!name || !deskripsi || !kategori || !lokasi || !biaya) throw {name: "NO_INPUT"}
      
      const newEvent = await Post.create({
        name,
        rt_id: req.user.rt_id,
        deskripsi,
        kategori,
        lokasi,
        biaya,
        isPaid: false,
      });

      res.status(201).json(newEvent);
    } catch (error) {
      next(error);
    }
  }

  static async updateEvent(req, res, next) {
    try {
      const { postId } = req.params;
      const { name, deskripsi, kategori, lokasi, biaya } = req.body;

      if (!name || !deskripsi || !kategori || !lokasi || !biaya) throw {name: "NO_INPUT"}

      const event = await Post.findByPk(postId);
      if (!event) throw { name: "POST_NOT_FOUND" };

      await Post.update(
        { name, deskripsi, kategori, lokasi, biaya },
        { where: { id: event.id } }
      );

      const message = `Event with id ${event.id} has ben updated`;

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async deleteEvent(req, res, next) {
    try {
      const { postId } = req.params;

      const deletedEvent = await Post.findByPk(postId);
      if (!deletedEvent) throw { name: "POST_NOT_FOUND" };

      await Post.destroy({
        where: { id: postId },
      });

      let message = `Berhasil menghapus event ${deletedEvent}`;

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerEvent;
