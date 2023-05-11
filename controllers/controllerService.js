const { Service, Submission, Rt, User } = require("../models");

class controllerService {
  static async createService(req, res, next) {
    try {
      const { name, deskripsi, dokumen_pendukung } = req.body;

      const newService = await Service.create({
        name,
        deskripsi,
        dokumen_pendukung,
        user_id: req.user.id,
        rt_id: req.user.rt_id,
      });

      let message = `Layanan baru ${newService.name} berhasil dibuat.`;

      res.status(201).json({ message, serviceId: newService.id });
    } catch (error) {
      next(error);
    }
  }

  static async getAllServices(req, res, next) {
    try {
      const options = {
        where: {
          rt_id: req.user.rt_id,
        },
        include: [
          {
            model: Rt,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };

      const services = await Service.findAll(options);

      res.status(200).json(services);
    } catch (error) {
      next(error);
    }
  }

  static async getServiceDetail(req, res, next) {
    try {
      const { serviceId } = req.params;

      const options = {
        where: {
          rt_id: req.user.rt_id,
        },
        include: [
          {
            model: Rt,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      };

      const service = await Service.findByPk(serviceId, options);
      if (!service) throw { name: "SERVICE_NOT_FOUND" };

      if (service.rt_id !== req.user.rt_id) throw { name: "Unauthorized" };

      res.status(200).json(service);
    } catch (error) {
      next(error);
    }
  }

  static async editService(req, res, next) {
    try {
      const { serviceId } = req.params;
      const { name, deskripsi, dokumen_pendukung } = req.body;

      const service = await Service.findByPk(serviceId);
      if (!service) throw { name: "SERVICE_NOT_FOUND" };

      await Service.update({ name, deskripsi, dokumen_pendukung }, { where: { id: service.id } });

      const message = `Data layanan ${service.name} berhasil diubah.`;

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async deleteService(req, res, next) {
    try {
      const { serviceId } = req.params;

      const service = await Service.findByPk(serviceId);
      if (!service) throw { name: "SERVICE_NOT_FOUND" };

      if (service.rt_id !== req.user.rt_id) throw { name: "Unauthorized" };

      await Service.destroy({
        where: { id: service.id },
      });

      const message = `Layanan ${service.name} berhasil dihapus`;

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = controllerService;
