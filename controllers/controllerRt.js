const { User, Rt, Vehicle, Comment, Service, Guest, Submission } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { Op } = require('sequelize');

class ControllerRt {

    static async loginRt(req, res, next) {
        try {
            let { email, password } = req.body
            if (!email) throw { name: "email_required" }
            if (!password) throw { name: "password_required" }

            const findUser = await User.findOne({
                where: {
                    email,
                }
            })

            if (!findUser) throw { name: "invalid_email/password" }
            const passwordValidated = comparePassword(password, findUser.password)

            if (!passwordValidated) throw { name: "invalid_email/password" }
            if (findUser.role !== "RT") throw { name: "Unauthorized" }

            const payload = {
                id: findUser.id,
            }

            const access_token = createToken(payload)
            console.log(access_token);

            const response = {
                access_token,
                email: findUser.email,
                userId: findUser.id
            }

            res.status(200).json(response)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    static async getAllRt(req, res, next) {
        try {
            const rts = await Rt.findAll({
                attributes: {
                    exclude: ["nik_rt", "link_grup_wa"]
                }
            });
            res.status(200).json(rts);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    static async registerRt(req, res, next) { // ini pak rt register mandiri sebelum login
        try {
            console.log(req.body);
            let { namaLengkap, nomorTelp, email, password, rt_id, nomorKtp } = req.body;
            const rt = await Rt.findByPk(rt_id);
            if (!rt) {
                throw { name: "RtNotFound" };
            }
            if (rt.nik_rt !== nomorKtp) { //melakukan validasi jika nik yg didaftarkan Admin tidak sama dengan nik yg diinput maka akan error
                throw { name: "Unauthorized" };
            }
            let newUser = await User.create({
                namaLengkap,
                email,
                password,
                rt_id,
                nomorKtp,
                role: "RT",
                nomorTelp,
                status: "approved"
            })
            const { password: _, ...userWithoutPassword } = newUser.dataValues;
            res.status(201).json(userWithoutPassword)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    static async registerSekretariat(req, res, next) { //ini pak rt yang mendaftarkan sekertariat setelah login
        try {
            console.log(req.body);
            let { namaLengkap, nomorTelp, email, password, nomorKtp } = req.body;
            let newUser = await User.create({
                namaLengkap,
                email,
                password,
                nomorKtp,
                rt_id: req.user.rt_id,
                role: "Sekretariat",
                nomorTelp,
                status: "done"
            })
            const { password: _, ...userWithoutPassword } = newUser.dataValues;
            res.status(201).json(userWithoutPassword)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    static async updateRequestUser(req, res, next) {
        try {
            const { userId, submissionId } = req.params;
            const { inputStatus } = req.query;

            const user = await User.findByPk(userId);
            if (!user) throw { name: "SERVICE_NOT_FOUND" };

            user.status = inputStatus; // ubah status user menjadi "done"
            await user.save();

            const request = await Submission.findByPk(submissionId);
            if (!request) throw { name: "SUBMISSION_NOT_FOUND" };

            await Submission.update(
                {
                    status: inputStatus,
                },
                { where: { id: request.id } }
            );

            let message = `${user.namaLengkap} `;

            if (inputStatus === "in progress") {
                message += "berhasil masuk dan akan diteruskan ke pak rt";
            } else if (inputStatus === "approved") {
                message += "sudah disetujui pak rt dan sedang dalam proses";
            } else if (inputStatus === "done") {
                message += "berhasil diproses akun sudah aktif";
            }

            console.log(inputStatus);

            res.status(200).json({ message });
        } catch (error) {
            next(error)
        }
    }

    static async findAllSubmissions(req, res, next) { // find All semua yg harus di acc rt sesuai rt_id
        try {
            const userId = req.user.id;
            const user = await User.findOne({
                where: { id: userId }
            });
            if (!user) {
                throw { name: "UserNotFound" };
            }
            const rtId = user.rt_id;
            const submissions = await Submission.findAll({
                where: { rt_id: rtId },
            });
            res.status(200).json(submissions);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deletSubmission(req, res, next) {
        try {
            const { id } = req.params;
            const submission = await Submission.findByPk(id);

            if (!submission) {
                throw { name: "DataNotFound" };
            }

            await submission.destroy({ where: { id } });

            res.status(200).json({
                message: `Data Persetujuna Dengan id ${id} berhasil dihapus`
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }



    static async findAllWarga(req, res, next) {
        try {
            // Mendapatkan ID user dari objek request
            const userId = req.user.id;
            // Mencari data user berdasarkan ID
            const user = await User.findByPk(userId);
            // Jika user tidak ditemukan, lemparkan error
            if (!user) {
                throw { name: "UserNotFound" };
            }
            // Jika user adalah RT/Sekertariat, tampilkan data warga sesuai dengan RT nya
            const rtId = user.rt_id;
            const rt = await Rt.findByPk(rtId, {
                include: [
                    {
                        model: User,
                        where: { role: { [Op.ne]: 'Admin' } }, //hanya yg bukan admin yg ditampilkan
                        attributes: { exclude: ["password"] },
                        include: [
                            {
                                model: Vehicle,
                            },
                            {
                                model: Service,
                            },
                            {
                                model: Comment,
                            },
                            {
                                model: Guest,
                            },
                        ],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });

            res.status(200).json(rt);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }


    static async createWarga(req, res, next) {
        try {
            const { namaLengkap, nomorTelp, email, password, nomorKk, nomorKtp, status_keluarga, kkImg, ktpImg, photoUrl, aktaImg, agama, jenis_kelamin, status_perkawinan, pekerjaan, tempat_lahir, tanggal_lahir } = req.body;

            const newUser = await User.create({
                namaLengkap,
                nomorTelp,
                email,
                password,
                role: "Warga",
                nomorKk,
                nomorKtp,
                status: "done",
                rt_id: req.user.rt_id,
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
                tanggal_lahir
            });

            res.status(201).json(newUser);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async deleteWarga(req, res, next) {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                throw { name: "UserNotFound" };
            }

            await user.destroy({ where: { id } });

            res.status(200).json({
                message: `Data warga dengan id ${id} berhasil dihapus`
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async updateWarga(req, res, next) {
        try {
            const { id } = req.params;
            const { namaLengkap, nomorTelp, email, nomorKk, nomorKtp, status_keluarga, kkImg, ktpImg, photoUrl, aktaImg, agama, jenis_kelamin, status_perkawinan, pekerjaan, tempat_lahir, tanggal_lahir } = req.body;
            const user = await User.findByPk(id);
            if (!user) {
                throw {
                    name: "UserNotFound",
                };
            }

            // Update user data
            await User.update(
                {
                    namaLengkap, nomorTelp, email, nomorKk, nomorKtp, status_keluarga, kkImg, ktpImg, photoUrl, aktaImg, agama, jenis_kelamin, status_perkawinan, pekerjaan, tempat_lahir, tanggal_lahir
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

}


module.exports = ControllerRt