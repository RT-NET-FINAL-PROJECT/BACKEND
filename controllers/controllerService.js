const { Service } = require("../models");

class controllerService {
    static async createService(req, res, next) {
        try {
            const { name, deskripsi } = req.body;

            const newService = await Service.create({
                name,
                user_id: req.user.id,
                rt_id: req.user.rt_id,
                deskripsi,
                status: "pending",
            });

            const message = `Permintaan layanan ${newService.name} berhasil dibuat.`;

            res.status(201).json({ message });
        } catch (error) {
            next(error);
        }
    }

    static async getAllServices(req, res, next) {
        try {
            const { status } = req.query;

            const options = {
                where: {
                    rt_id: req.user.rt_id,
                },
            };

            if (status) {
                options.where += { status };
            }

            const services = await Service.findALl(options);

            res.status(200).json(services);
        } catch (error) {
            next(error);
        }
    }

    static async getServiceDetail(req, res, next) {
        try {
            const { serviceId } = req.params;

            const service = await Service.findByPk(serviceId);
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
            const { name, deskripsi } = req.body;

            const service = await Service.findByPk(serviceId);
            if (!service) throw { name: "SERVICE_NOT_FOUND" };

            await Service.update({ name, deskripsi }, { where: { id: service.id } });

            const message = `Data layanan ${service.name} berhasil diubah.`;

            res.status(200).json({ message });
        } catch (error) {
            next(error);
        }
    }

    static async updateService(req, res, next) {
        try {
            const { serviceId } = req.params;
            const { inputStatus } = req.query;

            const service = await Service.findByPk(serviceId);
            if (!service) throw { name: "SERVICE_NOT_FOUND" };

            await Service.update(
                {
                    status: inputStatus,
                },
                { where: { id: service.id } }
            );

            let message = `Layanan ${service.name} `;

            if (inputStatus === "in progress") {
                message += "berhasil masuk dan akan diteruskan ke pak rt";
            } else if (inputStatus === "approved") {
                message += "sudah disetujui pak rt dan sedang dalam proses";
            } else if (inputStatus === "done") {
                message += "berhasil diproses dan sudah diambil di rumah pak rt";
            }

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