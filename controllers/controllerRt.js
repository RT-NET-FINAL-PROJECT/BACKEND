const { User, Rt, Vehicle, Comment, Service, Guest, Submission } = require('../models')
const { Op } = require('sequelize');

class ControllerRt {

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
                status: true
            })
            const { password: _, ...userWithoutPassword } = newUser.dataValues;
            res.status(201).json(userWithoutPassword)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }


    static async registerSekertariat(req, res, next) { //ini pak rt yang mendaftarkan sekertariat setelah login
        try {
            console.log(req.body);
            let { namaLengkap, nomorTelp, email, password, rt_id } = req.body;
            const rt = await Rt.findByPk(rt_id);
            if (!rt) {
                throw { name: "RtNotFound" };
            }
            let newUser = await User.create({
                namaLengkap,
                email,
                password,
                rt_id,
                role: "Sekertariat",
                nomorTelp,
                status: true
            })
            const { password: _, ...userWithoutPassword } = newUser.dataValues;
            res.status(201).json(userWithoutPassword)
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async approveUser(req, res, next) {
        try {
            const { id } = req.params;

            const user = await User.findByPk(id);
            if (!user) {
                throw { name: "UserNotFound" };
            }

            user.status = true; // ubah status user menjadi "Aktif"
            await user.save();

            const pengajuan = await Submission.findOne({
                where: {
                    user_id: id
                }
            });
            if (!pengajuan) {
                throw { name: "PengajuanNotFound" };
            }

            pengajuan.status = true; // ubah status pengajuan menjadi "Disetujui"
            await pengajuan.save();

            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            next(error);
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
                status: true,
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