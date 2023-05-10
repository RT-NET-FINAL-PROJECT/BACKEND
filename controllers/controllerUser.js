const {
  User,
  Rt,
  Submission,
  Vehicle,
  Service,
  Guest,
  Comment,
} = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const ImageKit = require("imagekit");
const submission = require("../models/submission");
class ControllerUser {
  static async register(req, res, next) {
    try {
      const {
        namaLengkap,
        nomorTelp,
        email,
        password,
        nomorKtp,
        status_keluarga,
        rt_id,
      } = req.body;

      const rt = await Rt.findByPk(rt_id);
      if (!rt) {
        throw { name: "RtNotFound" };
      }

      const newUser = await User.create({
        namaLengkap,
        email,
        password,
        nomorKtp,
        rt_id,
        role: "Warga",
        status_keluarga,
        nomorTelp,
        status: "pending", // set status pengajuan ke "Pending"
      });

      // tambahkan data pengajuan
      const newSubmission = await Submission.create({
        user_id: newUser.id,
        rt_id: newUser.rt_id,
        keterangan: "Register Warga",
        status: "pending",
      });

      const { password: _, ...userWithoutPassword } = newUser.dataValues;
      res.status(201).json({user: userWithoutPassword, submission: newSubmission});
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;
      if (!email) throw { name: "email_required" };
      if (!password) throw { name: "password_required" };

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      console.log(findUser.status);

      if (!findUser) throw { name: "invalid_email/password" };
      if (findUser.status === "pending") throw { name: "account_pending" };
      const passwordValidated = comparePassword(password, findUser.password);

      if (!passwordValidated) throw { name: "invalid_email/password" };
      const payload = {
        id: findUser.id,
      };

      const access_token = createToken(payload);
      console.log(access_token);

      const response = {
        access_token,
        email: findUser.email,
        userId: findUser.id,
      };

      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getKeluarga(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
          return res.status(404).json({ message: "USER_NOT_FOUND" });
      }
      // Find all users with the same nomorKk
      const users = await User.findAll({
          where: {
              nomorKk: user.nomorKk
          },
          attributes: {
              exclude: ['password']
          }
      });
      
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  //////CRUD USERS////
  static async detailUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id, {
        include: [
          {
            model: Vehicle,
          },
          {
            model: Service,
          },
          {
            model: Guest,
          },
          {
            model: Rt,
            attributes: {
              exclude: ['nik_rt']
            }
          }
        ],

        attributes: {
          exclude: ["password"],
        },
      });

      if (!user) {
        throw {
          name: "USER_NOT_FOUND",
        };
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const {
        namaLengkap,
        nomorTelp,
        email,
        nomorKk,
        nomorKtp,
        status_keluarga,
        kkImg,
        ktpImg,
        photoUrl,
        aktaImg,
        agama,
        jenis_kelamin,
        status_perkawinan,
        pekerjaan,
        tempat_lahir,
        tanggal_lahir,
      } = req.body;
      const user = await User.findByPk(id);
      if (!user) {
        throw {
          name: "UserNotFound",
        };
      }

      // Update user data
      await User.update(
        {
          namaLengkap,
          nomorTelp,
          email,
          nomorKk,
          nomorKtp,
          status_keluarga,
          kkImg,
          ktpImg,
          photoUrl,
          aktaImg,
          agama,
          jenis_kelamin,
          status_perkawinan,
          pekerjaan,
          tempat_lahir,
          tanggal_lahir,
        },
        { where: { id } }
      );

      res.status(201).json({
        message: "Success to update Profile",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addKtp(req, res, next) {
    try {
      let images = req.file;

      images.buffer = images.buffer.toString("base64");

      let imagekit = new ImageKit({
        publicKey: "public_gl6Q51cfkxxtJbVZPJSNlzcPLzY=",
        privateKey: "private_MS3sxSJXhbIh4Ijt8KE6mBndgOk=",
        urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
      });

      imagekit.upload(
        {
          file: images.buffer, //required
          fileName: images.fieldname + ".jpg", //required
        },
        async function (error, result) {
          try {
            if (error) throw { name: "UPLOAD_FAILED" };
            else {
              console.log(result);
              await User.update(
                {
                  ktpImg: result.url,
                },
                { where: { id: req.user.id } }
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      );

      res.status(200).json({message: "Gambar KTP berhasil diunggah"})
    } catch (error) {
      next(error);
    }
  }

  static async addKartuKeluarga(req, res, next) {
    try {
      let images = req.file;

      images.buffer = images.buffer.toString("base64");

      let imagekit = new ImageKit({
        publicKey: "public_gl6Q51cfkxxtJbVZPJSNlzcPLzY=",
        privateKey: "private_MS3sxSJXhbIh4Ijt8KE6mBndgOk=",
        urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
      });

      imagekit.upload(
        {
          file: images.buffer, //required
          fileName: images.fieldname + ".jpg", //required
        },
        async function (error, result) {
          try {
            if (error) throw { name: "UPLOAD_FAILED" };
            else {
              console.log(result);
              await User.update(
                {
                  kkImg: result.url,
                },
                { where: { id: req.user.id } }
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      );

      res.status(200).json({message: "Gambar Kartu Keluarga berhasil diunggah"})
    } catch (error) {
      next(error);
    }
  }

  static async addPhoto(req, res, next) {
    try {
      let images = req.file;

      images.buffer = images.buffer.toString("base64");

      let imagekit = new ImageKit({
        publicKey: "public_gl6Q51cfkxxtJbVZPJSNlzcPLzY=",
        privateKey: "private_MS3sxSJXhbIh4Ijt8KE6mBndgOk=",
        urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
      });

      imagekit.upload(
        {
          file: images.buffer, //required
          fileName: images.fieldname + ".jpg", //required
        },
        async function (error, result) {
          try {
            if (error) throw { name: "UPLOAD_FAILED" };
            else {
              console.log(result);
              await User.update(
                {
                  photoUrl: result.url,
                },
                { where: { id: req.user.id } }
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      );

      res.status(200).json({message: "Gambar Profil berhasil diunggah"})
    } catch (error) {
      next(error);
    }
  }

  static async addAkta(req, res, next) {
    try {
      let images = req.file;

      images.buffer = images.buffer.toString("base64");

      let imagekit = new ImageKit({
        publicKey: "public_gl6Q51cfkxxtJbVZPJSNlzcPLzY=",
        privateKey: "private_MS3sxSJXhbIh4Ijt8KE6mBndgOk=",
        urlEndpoint: "https://ik.imagekit.io/your_imagekit_id/",
      });

      imagekit.upload(
        {
          file: images.buffer, //required
          fileName: images.fieldname + ".jpg", //required
        },
        async function (error, result) {
          try {
            if (error) throw { name: "UPLOAD_FAILED" };
            else {
              console.log(result);
              await User.update(
                {
                  aktaImg: result.url,
                },
                { where: { id: req.user.id } }
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      );

      res.status(200).json({message: "Akta kelahiran berhasil diunggah"})
    } catch (error) {
      next(error);
    }
  }

  /////////////////////////CRUD KENDARAAN/////////////////////////////////////////////

  static async addKendaraan(req, res, next) {
    try {
      const { name, nomorPolisi } = req.body;
      const add = await Vehicle.create({
        name,
        nomorPolisi,
        user_id: req.user.id,
      });
      res.status(201).json(add);
    } catch (error) {
      next(error);
    }
  }

  static async updateKendaraan(req, res, next) {
    try {
      const { id } = req.params;
      const { name, nomorPolisi } = req.body;
      const vehicle = await Vehicle.findByPk(id);
      if (!vehicle) {
        throw {
          name: "VehicleNotFound",
        };
      }

      // Update kendaraan data
      await Vehicle.update(
        {
          name,
          nomorPolisi,
        },
        { where: { id } }
      );

      res.status(201).json({
        message: "Success to update Kendaraan",
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteKendaraan(req, res, next) {
    try {
      const { id } = req.params;
      const vehicle = await Vehicle.findByPk(id);

      await Vehicle.destroy({ where: { id } });

      res.status(200).json({
        message: `Kendaraan berhasil dihapus`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  ///////////CRUD TAMU/////////////////
  static async addTamu(req, res, next) {
    try {
      const { name, nomorKtp } = req.body;
      const add = await Guest.create({
        name,
        nomorKtp,
        user_id: req.user.id,
      });
      res.status(201).json(add);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTamu(req, res, next) {
    try {
      const { id } = req.params;
      const guest = await Guest.findByPk(id);

      await Guest.destroy({ where: { id } });

      res.status(200).json({
        message: `Tamu berhasil dihapus`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  ///////////CRUD COMMENT SECTION/////////////////
  static async addComment(req, res, next) {
    try {
      const { comment, post_id } = req.body;
      const add = await Comment.create({
        comment,
        post_id,
        user_id: req.user.id,
      });
      res.status(201).json(add);
    } catch (error) {
      next(error);
    }
  }

  static async deleteComment(req, res, next) {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id);

      await Comment.destroy({ where: { id } });

      res.status(200).json({
        message: `Komentar berhasil dihapus`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ControllerUser;
