const { Post, Comment, User } = require("../models");
const { sendEmailToResidents } = require("../helpers/smtp");
class ControllerEvent {
  static async findAllPosts(req, res, next) {
    try {
      let options = {
        where: {
          rt_id: req.user.rt_id,
        },
      };

      const events = await Post.findAll(options);

      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async findAllEvent(req, res, next) {
    try {
      let options = {
        where: {
          kategori: "event",
          rt_id: req.user.rt_id,
        },
      };

      const events = await Post.findAll(options);

      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  }

  static async findAllAnnouncements(req, res, next) {
    try {
      const announcements = await Post.findAll({
        where: {
          kategori: "pengumuman",
          rt_id: req.user.rt_id,
        },
      });

      res.status(200).json(announcements);
    } catch (error) {
      next(error);
    }
  }

  static async detailEvent(req, res, next) {
    try {
      const { id } = req.params;

      const event = await Post.findByPk(id, {
        include: [
          {
            model: Comment,
            include: [{ model: User, attributes: ["namaLengkap"] }],
          },
        ],
      });
      if (!event) throw { name: "POST_NOT_FOUND" };

      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  }

  static async createEvent(req, res, next) {
    try {
      const { name, deskripsi, kategori, lokasi, biaya, imageUrl } = req.body;
      if (!name || !deskripsi || !kategori || !lokasi || !biaya || !imageUrl) {
        throw { name: "NO_INPUT" };
      }

      const newEvent = await Post.create({
        name,
        rt_id: req.user.rt_id,
        deskripsi,
        kategori,
        lokasi,
        biaya,
        imageUrl,
        isPaid: false,
      });

      // Kirim email pemberitahuan
      await sendEmailToResidents(newEvent);

      res.status(201).json(newEvent);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateEvent(req, res, next) {
    //aman
    try {
      const { id } = req.params;
      const { name, deskripsi, kategori, lokasi, biaya, imageUrl } = req.body;

      if (!name || !deskripsi || !kategori || !lokasi || !biaya || !imageUrl)
        throw { name: "NO_INPUT" };

      const event = await Post.findByPk(id);
      if (!event) throw { name: "POST_NOT_FOUND" };

      await Post.update(
        { name, deskripsi, kategori, lokasi, biaya, imageUrl },
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
      const { id } = req.params;

      const deletedEvent = await Post.findByPk(id);
      if (!deletedEvent) throw { name: "POST_NOT_FOUND" };

      if (deletedEvent.rt_id !== req.user.rt_id) throw { name: "Unauthorized" };

      await Post.destroy({
        where: { id: id },
      });

      let message = `Berhasil menghapus event ${deletedEvent}`;

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerEvent;
