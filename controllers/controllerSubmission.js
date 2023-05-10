const ImageKit = require("imagekit");
const { Service, Submission, Rt, User, Attachment } = require("../models");

class ControllerSubmission {
  static async requestService(req, res, next) {
    //untuk user
    try {
      const lampiran = req.file;
      const { serviceId } = req.params;
      const { keterangan } = req.body;

      const service = await Service.findByPk(serviceId);
      if (!service) throw { name: "SERVICE_NOT_FOUND" };

      if (service.rt_id !== req.user.rt_id) throw { name: "Unauthorized" };

      const newService = await Submission.create({
        user_id: req.user.id,
        rt_id: req.user.rt_id,
        service_id: service.id,
        keterangan,
        status: "pending",
      });

      lampiran.buffer = lampiran.buffer.toString("base64");

      let imagekit = new ImageKit({
        publicKey: "public_gl6Q51cfkxxtJbVZPJSNlzcPLzY=",
        privateKey: "private_MS3sxSJXhbIh4Ijt8KE6mBndgOk=",
        urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
      });

      imagekit.upload(
        {
          file: lampiran.buffer, //required
          fileName: "my_file_name.jpg", //required
        },
        async function (error, result) {
          if (error) throw { name: "UPLOAD_FAILED" };
          else {
            console.log(result);
            await Attachment.create({
              attachUrl: result.url,
              submission_id: newService.id,
            });
          }
        }
      );

      const message = `Permintaan ${service.name} berhasil dibuat.`;

      res.status(201).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async getAllSubmission(req, res, next) {
    try {
      const { status } = req.query;

      let options = {
        where: {
          rt_id: req.user.rt_id,
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: Service,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      };

      if (status) {
        options.where.status = status;
      }

      const requests = await Submission.findAll(options);

      res.status(200).json(requests);
    } catch (error) {
      next(error);
    }
  }

  static async getSubmissionDetail(req, res, next) {
    try {
      const { submissionId } = req.params;

      let options = {
        include: [
          {
            model: User,
            attributes: {
              exclude: ["createdAt", "updatedAt", "password"],
            },
          },
          {
            model: Service,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
      };

      const submission = await Submission.findByPk(submissionId, options);
      if (!submission) throw { name: "SUBMISSION_NOT_FOUND" };

      res.status(200).json(submission);
    } catch (error) {
      next(error);
    }
  }

  static async editSubmission(req, res, next) {
    try {
      const { submissionId } = req.params;
      const { keterangan } = req.body;

      const request = await Submission.findByPk(submissionId);
      if (!request) throw { name: "SUBMISSION_NOT_FOUND" };

      await Submission.update({ keterangan }, { where: { id: request.id } });

      res.status(200).json({
        message: `Permintaan layanan dengan id ${request.id} berhasil diedit`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateRequestService(req, res, next) {


    try {
      const { serviceId, submissionId } = req.params;
      const { inputStatus } = req.query;

      const service = await Service.findByPk(serviceId);
      if (!service) throw { name: "SERVICE_NOT_FOUND" };

      const warga = await User.findByPk(serviceId);
      if (!warga) throw { name: "SERVICE_NOT_FOUND" };

      warga.status = inputStatus;


      const request = await Submission.findByPk(submissionId);
      if (!request) throw { name: "SUBMISSION_NOT_FOUND" };



      await Submission.update(
        {
          status: inputStatus,
        },
        { where: { id: request.id } }
      );

      let message = `${service.name} `;

      if (inputStatus === "in progress") {
        message += "berhasil masuk dan akan diteruskan ke pak rt";
      } else if (inputStatus === "approved") {
        message += "sudah disetujui pak rt dan sedang dalam proses";
      } else if (inputStatus === "done") {
        message += "berhasil diproses dan sudah diambil di rumah pak rt";
      }

      console.log(inputStatus);

      res.status(200).json({ message });
    } catch (error) {
      next(error);
    }
  }

  static async deleteSubmission(req, res, next) {
    try {
      const { submissionId } = req.params;

      const request = await Submission.findByPk(submissionId);
      if (!request) throw { name: "SUBMISSION_NOT_FOUND" };

      await Submission.destroy({
        where: { id: request.id },
      });

      res.status(200).json({
        message: `Permintaan layanan dengan id ${request.id} berhasil dihapus`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ControllerSubmission;
