const { Payment, Kas, Post, User } = require("../models");
const { post } = require("../routes/warga");
class ControllerPayment {
  static async findAllPayment(req, res, next) {
    try {
      const paymentsData = await Payment.findAll();

      res.status(200).json(paymentsData);
    } catch (error) {
      next(error);
    }
  }

  static async findUserPayment(req, res, next) {
    try {
      const userPayments = await Payment.findAll({
        where: {
          user_id: req.user.id,
        },
      });

      res.status(200).json(userPayments);
    } catch (error) {
      next(error);
    }
  }

  static async createPayment(req, res, next) {
    try {
      const { postId } = req.params;
      const { nominal } = req.body;

      const eventPost = await Post.findByPk(postId);
      if (!eventPost) throw { name: "POST_NOT_FOUND" };

      const newPayment = await Payment.create({
        user_id: req.user.id,
        post_id: eventPost.id,
        nominal,
      });

      await Post.update(
        {
          dibayar: true,
        },
        { where: { id: postId } }
      );

      const invoice = await Payment.findByPk(newPayment.id, {
        include: [
          {
            model: User,
            attributes: ["name"],
          },
          {
            model: Post,
            attributes: ["name", "nominal"],
          },
        ],
      });

      const message = `Pembayaran untuk event ${eventPost.name} senilai ${nominal} berhasil!`;

      res.status(201).json({ message, invoice });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerPayment;
